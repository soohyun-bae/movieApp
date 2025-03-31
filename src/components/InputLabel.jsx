import { forwardRef } from 'react';
import '../style/login.scss'

const InputLabel = forwardRef(({ label, fieldType, error, ...rest }, ref) => {

  return (
    <div className='input-label-container'>
      <label htmlFor='{label}'>{label}</label> {/*htmlFor : 주소 <label>요소와 함께 사용. 입력 필드 또는 특정 요소와 관련된 연결을 설정하는 데 사용*/}
      <input
        id={label}
        type={fieldType}
        ref={ref}
        {...rest}
      />
      <div className='h-[25px]'>
        {error && (
          <p className='text-red-400'>{error}</p>
        )}
      </div>
    </div>
  );
});

export default InputLabel;