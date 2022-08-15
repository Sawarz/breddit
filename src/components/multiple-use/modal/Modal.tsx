import { useState } from 'react'
import styles from './modal.module.css'
import Firebase from '../../../firebase/Firebase'

type Props = {
    toggleModal: Function,
}

export default function Modal({ toggleModal }: Props) {
  const [validationMessage, setValidationMessage] = useState<string>("Enter a community name first")
  const [validation, setValidation] = useState<boolean>(false);
  const [communityCreated, setCommunityCreated] = useState<boolean>(false)
  let inputValue: string;

  async function validateCommunity(communityInput: string) {
    const communities = await Firebase.community.getAll();
    communities.some((community) => {
      if (community.name.toLowerCase() === communityInput.toLowerCase()) {
        setValidationMessage("Community with this name already exists!");
        setValidation(false);
        return true;
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
        {communityCreated ? <div className={styles.success}>Community succesfully created!</div> : null}
        <div className={styles.buttons}>
          {communityCreated ? null : <button className={styles.createButton} style={validation ? { backgroundColor: "rgba(27, 197, 27, 0.726)" } : { backgroundColor: "gray" }} onClick={(e) => {
            if (validation) {
              Firebase.community.create(inputValue);
              setCommunityCreated(true);
              setTimeout(toggleModal, 3000);
            }
          }}>Create</button>
          }
          <button className={styles.closeButton} onClick={() => {
            toggleModal();
          }}>Close</button>
        </div>
      </div>
    </div>
  )
}
