import { useState, useEffect, useRef } from 'react'
import Firebase from '../../../firebase/Firebase';
import styles from './dropdown.module.css'
import Modal from '../modal/Modal'

type props = {
    label: string,
    options: Array<string>,
    chooseCommunity: Function
}

export default function Dropdown({ label, options, chooseCommunity }: props) {
  const [showOptions, _setShowOptions] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [community, setCommunity] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

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

  function toggleModal() {
    setModalOpen(!modalOpen);
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
                    if (option != "Create new community") {
                      chooseCommunity(option);
                      setCommunity(option);
                      setShowOptions(false);
                    }
                    else {
                      setModalOpen(true);
                      setShowOptions(false);
                    }
                  }}>{option}</button>
                )
              }
              return null;
            })}
              </div>
            :
            null
        }
        {modalOpen ? <Modal toggleModal={toggleModal}/> : null}
      </div>
      )
}
