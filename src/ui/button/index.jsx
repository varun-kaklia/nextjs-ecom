const CustomButton = ({ text, onClickHandle, customClass }) => {
  return (
    <button className={`custom-button custon-transition ${customClass}`} onClick={onClickHandle} >
      <span>{text}</span>
    </button>
  );
};

export default CustomButton;
