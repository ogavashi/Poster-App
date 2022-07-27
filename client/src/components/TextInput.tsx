import { ChangeEvent, useContext } from "react";
import { AppContext } from "../context";

const TextInput = () => {
  const { postValue, setPostValue } = useContext(AppContext);
  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPostValue(event.target.value);
  };
  return (
    <div className="text-input-container">
      <input
        className="text-input"
        type="text"
        value={postValue}
        onChange={onChangeInput}
        placeholder="Enter your message..."
      />
    </div>
  );
};

export default TextInput;
