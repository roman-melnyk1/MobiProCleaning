import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import css from "./CustomSelect.module.css";

export default function CustomSelect({ options, placeholder, onChange, isMulti = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(isMulti ? [] : null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    if (isMulti) {
      const isAlreadySelected = selected.some((item) => item.value === option.value);
      let newSelected;

      if (isAlreadySelected) {
        newSelected = selected.filter((item) => item.value !== option.value);
      } else {
        newSelected = [...selected, option];
      }

      setSelected(newSelected);
      if (onChange) onChange(newSelected);
    } else {
      setSelected(option);
      setIsOpen(false);
      if (onChange) onChange(option);
    }
  };

  const getDisplayText = () => {
    if (isMulti) {
      if (selected.length === 0) return placeholder;
      if (selected.length === 1) return selected[0].label;
      return `Вибрано послуг: ${selected.length}`;
    }
    return selected ? selected.label : placeholder;
  };

  return (
    <div className={css.container} ref={dropdownRef}>
      <div className={`${css.header} ${isOpen ? css.headerActive : ""}`} onClick={() => setIsOpen(!isOpen)}>
        <span className={(!isMulti && !selected) || (isMulti && selected.length === 0) ? css.placeholder : ""}>
          {getDisplayText()}
        </span>
        <ChevronDown className={`${css.icon} ${isOpen ? css.iconRotate : ""}`} size={20} />
      </div>

      <ul className={`${css.list} ${isOpen ? css.listOpen : ""}`}>
        {options.map((option) => {
          const isSelected = isMulti
            ? selected.some((item) => item.value === option.value)
            : selected?.value === option.value;

          return (
            <li
              key={option.value}
              className={`${css.option} ${isSelected ? css.optionSelected : ""}`}
              onClick={() => handleSelect(option)}
            >
              <span className={css.optionLabel}>{option.label}</span>
              {isMulti && isSelected && <Check size={16} className={css.checkIcon} />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
