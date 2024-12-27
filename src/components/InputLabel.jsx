import React from 'react';
import '../style/login.scss'
import { useDispatch, useSelector } from 'react-redux';
import { loginInputSlice } from '../rtk/slice';

const InputLabel = ({ label, fieldType }) => {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.loginInput.error)

  const inputChange = (e) => {
    dispatch(loginInputSlice.actions.setField({ fieldType: fieldType, value: e.target.value }))
  }

  return (
    <div className='input-label-container'>
      <label htmlFor='{label}'>{label}</label> {/*htmlFor : 주소 <label>요소와 함께 사용. 입력 필드 또는 특정 요소와 관련된 연결을 설정하는 데 사용*/}
      <input
        type={fieldType}
        id={label}
        onChange={inputChange}
      />
      <div className='h-[25px]'>
        {error[fieldType] && (
          <p className='text-red-400'>{error[fieldType]}</p>
        )}
      </div>
    </div>
  );
};

export default InputLabel;