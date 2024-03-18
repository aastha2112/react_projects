function CreateAccountButton(props) {
  return (
    <button
      onClick={props.onSubmit}
      className="bg-[#111111] rounded-[40px] w-[534px] h-[64px] flex justify-center items-center mt-[24px] mobile:w-full mobile:mt-2"
    >
      <div className="text-white text-[22px] font-medium">{props.title}</div>
    </button>
  );
}
export default CreateAccountButton;
