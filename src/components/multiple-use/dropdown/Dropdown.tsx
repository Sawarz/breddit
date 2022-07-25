import { useState, useEffect, useRef } from 'react'
import styles from './styles.module.css'

type props = {
    label: string,
    options: Array<string>,
    chooseCommunity: Function
}

export default function Dropdown({ label, options, chooseCommunity }: props) {
  const [showOptions, _setShowOptions] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [community, setCommunity] = useState("")

  const dropdown = useRef<HTMLDivElement>(null);
  const stateRef = useRef<boolean>(showOptions);
  const inputRef = useRef<HTMLInputElement>(null);

  function setShowOptions(data: boolean){
    stateRef.current = data;
    _setShowOptions(data);
  }

  const closeOpenMenus = (e: MouseEvent) => {
    if (dropdown.current != null) {
      if (stateRef.current && !dropdown.current.contains(e.target as Node)) {
        setShowOptions(false)
      }
    }
  }
  
  useEffect(() => {
    document.addEventListener('mousedown', closeOpenMenus);
  }, [])

  useEffect(() => {
    if(inputRef.current)
      inputRef.current.value = community;
  }, [community])

    return (
      <div className={styles.dropdown} ref={dropdown}>
        <input className={styles.search}
          ref={inputRef}
          onClick={() => {
            setShowOptions(true);
          }}
          onChange={(e) => {
            setShowOptions(true);
            setSearchText(e.target.value)
          }}
          onFocus={(e) => {
            e.target.select();
          }}
          placeholder={label}
        />
          {showOptions ? 
            <div className={styles.options}>
            {options.map((option: string, i) => {
              if (option.toLowerCase().includes(searchText)) {
                return (
                  <button key={i} className={styles.option} onClick={() => {
                    chooseCommunity(option);
                    setCommunity(option);
                    setShowOptions(false);
                  }}>{option}</button>
                )
              }
              return null;
            })}
              </div>
            :
            <div></div>
          }
      </div>
      )
}
