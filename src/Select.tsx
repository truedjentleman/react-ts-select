import styles from './select.module.css'
import { useEffect, useState } from 'react'

type SelectOption = {
  label: string
  value: string | number
}

type SelectProps = {
  options: SelectOption[]
  value?: SelectOption
  onChange: (value: SelectOption | undefined) => void
}

export function Select({ value, options, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  function clearOptions() {
    onChange(undefined) // pass 'undefined' to onChange function
  }

  function selectOption(option: SelectOption) {
    // call the onChange only if the other option is selected
    if (option !== value) {
      // console.log('onChange running') // DEBUG
      onChange(option) // pass the 'option' to onChange function
    }
  }

  function isOptionSelected(option: SelectOption) {
    return option === value // if they are (current selected value and option in list) the same exact values - return 'true'
  }

  // * every single time we open the list  - reset highlight Index to 0
  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  }, [isOpen])

  return (
    <div
      onBlur={() => setIsOpen(false)} // to hide list of options when the list out of focus
      onClick={() => setIsOpen((prev) => !prev)} // change the 'isOpen' state value to opposite - revert it
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>{value?.label}</span>
      <button
        onClick={(e) => {
          e.stopPropagation() // to prevent 'click' event propagation to parent div
          clearOptions()
        }}
        className={styles['clear-btn']}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation() // prevent 'click' event propagation to parent div
              selectOption(option)
              setIsOpen(false) // close the list after selection
            }}
            onMouseEnter={() => setHighlightedIndex(index)} // highlight the options on mouse hover
            key={option.value}
            // add 'selected' class to option in list, which is currently selected
            className={`${styles.option} ${
              isOptionSelected(option) ? styles.selected : ''
            } ${index === highlightedIndex ? styles.highlighted : ''}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
