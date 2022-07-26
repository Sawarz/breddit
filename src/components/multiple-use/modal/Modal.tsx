import { useState } from 'react'
import styles from './modal.module.css'
import Firebase from '../../../firebase/Firebase'

type Props = {
    toggleModal: Function,
}

export default function Modal({ toggleModal }: Props) {
  const [validationMessage, setValidationMessage] = useState("Enter a community name first")
  const [validation, setValidation] = useState(false);
  let inputValue: string;

  async function validateCommunity(communityInput: string) {
    const communities = await Firebase.getCommunities();
    communities.forEach((community) => {
      console.log(community.name +" "+ communityInput);
      if (community.name === communityInput) {
        setValidationMessage("Community with this name already exists!");
        setValidation(false);
      }
      else {
        setValidationMessage("Community can be created!");
        setValidation(true);
      }
    })
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalWindow}>
        <div className={styles.modalTitle}>Create a community!</div>
        <input onChange={(e) => {
          inputValue = e.target.value;
          validateCommunity(e.target.value);
        }}></input>
        <div>Availability: {validationMessage}</div>
        <div className={styles.buttons}>
          <button className={styles.createButton} style={validation ? {backgroundColor: "rgba(27, 197, 27, 0.726)"} : {backgroundColor: "gray"}} onClick={(e) => {
            if (validation) {
              Firebase.createNewCommunity(inputValue);
              toggleModal();
            }
          }}>Create</button>
          <button className={styles.closeButton} onClick={() => {
            toggleModal();
          }}>Close</button>
        </div>
      </div>
    </div>
  )
}
