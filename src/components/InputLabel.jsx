// import useValidation from '../hooks/useValidation';
import '../style/login.scss'

const InputLabel = ({ label, fieldType, name, onChange, error }) => {
  // const {errors, validate} = useValidation()

  // const inputChange = (e) => {
  //   const value = e.target.value;
  //   // validate(fieldType, value);
  // }

  return (
    <div className='input-label-container'>
      <label htmlFor='{label}'>{label}</label> {/*htmlFor : 주소 <label>요소와 함께 사용. 입력 필드 또는 특정 요소와 관련된 연결을 설정하는 데 사용*/}
      <input
        id={label}
        type={fieldType}
        name={name}
        onChange={onChange}
      />
      <div className='h-[25px]'>
        {error[name] && (
          <p className='text-red-400'>{error[name]}</p>
        )}
      </div>
    </div>
  );
};

export default InputLabel;