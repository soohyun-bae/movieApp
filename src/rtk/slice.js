import { createSlice } from "@reduxjs/toolkit";
import { fetchDetails, fetchMovie, fetchSearch } from "./thunk";

export const detailSlice = createSlice({
  name: 'details',
  initialState: {
    list: {},
    loading:true,
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchDetails.pending, (state) => {
      state.loading=true;
    })
    .addCase(fetchDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    })
    .addCase(fetchDetails.rejected, (state) => {
      state.loading=false;
    })
  }
})

export const movieSlice = createSlice({
  name: 'movies',
  initialState:{
    mainMovies: [],
    searchMovies: [],
    loading: true,
  },
  reducers:{
    setMovies(state, action) {
      state.mainMovies=action.payload;
    },
    resetMovies(state){
      state.mainMovies = [],
      state.loading=true
    }
  },
  extraReducers:(builder) => {
    builder
    .addCase(fetchMovie.pending, (state) => {
      state.loading= true;
      console.log('pending')
    })
    .addCase(fetchMovie.fulfilled, (state, action) => {
      state.loading=false;
      state.mainMovies = action.payload;
    })
    .addCase(fetchMovie.rejected, (state) => {
      state.loading = false;
      console.log('rejected')
    })
    .addCase(fetchSearch.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchSearch.fulfilled, (state, action) => {
      state.loading=false;
      state.searchMovies=action.payload
    })
  }
})

export const {setMovies, resetMovies} = movieSlice.actions

export const loginInputSlice = createSlice({
  name: 'loginInput',
  initialState:{
    emailOrPhone: '',
    // phone: '',
    password: '',
    name: '',
    error: {},
  },
  reducers:{
    setField: (state, action) => {
      const {fieldType, value} = action.payload

      const validators = {
        // ^ : 문자열의 시작
        // [] : 문자 클래스. 이 안에 포함된 내용을 기준으로 매칭
        // 클래스 내부 ^ : 부정을 의미
        // \s:공백문자(스페이스, 탭, 줄바꿈 등)
        // @ : @
        // + : 바로 앞 패턴이 1번 이상 반복 되어야 함을 의미
        // \. : .은 정규식에서 '임의의 문자'를 의미하기 때문에 이를 문자로 인식하기위해서 \ 사용
        // $ : 문자열의 끝
        email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@+$]/.test(val) || '유효한 이메일 주소를 입력하세요.',
        // emailOrPhone: (val) => /^[^\s@]+@[^\s@]+\.[^\s@+$]/.test(val) || /^\d{10,11}$/.test(val) || '유효한 이메일 주소 또는 전화 번호를 입력하세요.' ,
        // \d: 숫자 하나(0-9)
        //{10,11}: 바로 아 패턴이 10번에서 11번까지 반복된다. 최소 10 최대 11
        // phone: (val) => /^\d{10,11}$/.test(val) || ' 유효한 전화번호를 입력하세요.',
        password: (val) => val.length >=8 || '비밀번호는 8자 이상이어야 합니다.',
        name: (val) => val.trim().length > 0 || '이름은 필수 입력 항목입니다.',
      }

      // label을 대괄호로 묶은 이유 :
      // 속성을 동적으로 결정하기 위해서.
      // 여러개의 라벨을 넣을거니까
      if(validators[fieldType]){
        const validationResult = validators[fieldType](value)

        if(validationResult === true) {
          state[fieldType] = value;
          state.error[fieldType] = null;
        } else {
          state.error[fieldType] = validationResult
        }
      } else {
        state[fieldType] = value
      }
    }
  }
})
