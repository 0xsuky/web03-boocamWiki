import React, { useState, useRef, useReducer } from 'react';
import styled from 'styled-components';
import MainHeader from '../SectionTitle';
import Title from './make-section-components/InputTitle';
import EditorWithPreview from './make-section-components/EditorWithPreview';
import Editor from './make-section-components/Editor';
import Preview from './make-section-components/Preview';
import MakePageRule from './make-section-components/MakePageRule';
import DocCard from './make-section-components/DocCard';

const Main = styled.div`
  width: 1115px;
  height: 100%;
  background: white;
  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-right: 50px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.div`
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  width: 90%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-self: start;
`;

const EditorType = styled.div`
  display: flex;
`;

const EditorTypeBtn = styled.button`
  width: 80px;
  background-color: white;
  border: 1px solid gray;
`;

const RuleDiv = styled.div`
  display: flex;
  align-items: center;
  color: red;
  margin-bottom: 10px;
  margin-top: 5px;
`;

const ButtonWrap = styled.div``;

const SubmitBtn = styled.button`
  width: 100px;
  height: 40px;
  color: white;
  background-color: #0055fb;
  border-radius: 11px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  border: none;
  margin-right: 20px;
`;

const CancelBtn = styled.button`
  width: 100px;
  height: 40px;
  color: white;
  background-color: #f45452;
  border-radius: 11px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  border: none;
`;

const docDataReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_TITLE':
      return { ...state, generation: action.generation, boostcamp_id: action.boostcamp_id, name: action.name };
    case 'INPUT_CONTENT':
      return { ...state, content: action.content };
    case 'INPUT_CLASSIFICATION':
      return { ...state, classification: action.classification };
    case 'INPUT_USER_IMAGE':
      return { ...state, user_image: action.user_image };
    case 'INPUT_NICKNAME':
      return { ...state, nickname: action.nickname };
    case 'INPUT_LOCATION':
      return { ...state, location: action.location };
    case 'INPUT_LANGUAGE':
      return { ...state, language: action.language };
    case 'INPUT_MBTI':
      return { ...state, mbti: action.mbti };
    case 'INPUT_FIELD':
      return { ...state, field: action.field };
    case 'INPUT_LINK':
      return { ...state, link: action.link };
    default:
      return state;
  }
};

const initialDocData = {
  generation: 0,
  boostcamp_id: '',
  name: '',
  content: '',
  nickname: null,
  location: null,
  language: null,
  user_image: null,
  mbti: null,
  field: null,
  link: null,
  classification: 'camper',
};

const MakeSection = ({ history }) => {
  const [canMake, setCanMake] = useState(false);
  const [inputStatus, setInputStatus] = useState('editor');
  const [docRule, setDocRule] = useState(false);
  const [docData, dispatch] = useReducer(docDataReducer, initialDocData);

  const editorTypes = [
    { name: 'editor', text: '편집기', component: <Editor docData={docData} dispatch={dispatch} /> },
    { name: 'preview', text: '미리보기', component: <Preview docData={docData} /> },
    {
      name: 'editorWithPreview',
      text: '동시보기',
      component: <EditorWithPreview docData={docData} dispatch={dispatch} />,
    },
  ];

  const handleBtn = (e) => {
    setInputStatus(e.target.value);
  };

  const handleRule = (e) => {
    if (e.target.checked) setDocRule(true);
    else setDocRule(false);
  };

  const addDocument = async () => {
    if (!canMake) alert('생성 가능 여부를 확인해주세요');
    else if (!docRule) alert('규정에 동의해주세요');
    else {
      await fetch('/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(docData),
      }).then((res) => res.json());
      history.goBack();
    }
  };

  const cancelAddDoc = () => {
    history.goBack();
  };

  return (
    <Main>
      <MainHeader title="문서 생성" />

      <SectionTitle>문서 정보 입력</SectionTitle>
      <Title setCanMake={setCanMake} canMake={canMake} docData={docData} dispatch={dispatch} />

      <SectionTitle>명함 정보 입력</SectionTitle>
      <DocCard docData={docData} dispatch={dispatch} />

      <SectionTitle>문서 내용 입력</SectionTitle>
      <div>
        <EditorType>
          {editorTypes.map((type) => (
            <div key={type.name}>
              <EditorTypeBtn onClick={handleBtn} value={type.name}>
                {type.text}
              </EditorTypeBtn>
            </div>
          ))}
        </EditorType>
        {editorTypes.map((type) => (
          <div key={type.name}>{type.name === inputStatus ? type.component : <></>}</div>
        ))}
      </div>

      <RuleDiv>
        <input type="checkbox" style={{ margin: '10px' }} onChange={handleRule} />
        작성자는 아래 규정에 동의합니다.
      </RuleDiv>

      <ButtonWrap>
        <SubmitBtn onClick={addDocument}>등록</SubmitBtn>
        <CancelBtn onClick={cancelAddDoc}>취소</CancelBtn>
      </ButtonWrap>

      <MakePageRule />
    </Main>
  );
};

export default MakeSection;
