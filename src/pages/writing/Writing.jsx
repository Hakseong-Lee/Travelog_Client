import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import WritingSidebar from './WritingSidebar';
import TagBtn from './TagBtn';
import CityTag from './CityTag';
import WritingBoardList from './WritingBoardList'
// Toast 에디터
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
//Toast ColorSyntax 플러그인
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
// recoil
import { useRecoilState } from 'recoil';
import { boardState, tagState, CityTagToggleState } from '../../recoil/Atom.jsx';
//react dnd
import { useDrop } from 'react-dnd';
import axios from 'axios';
//s3
import { S3Upload } from '../../components/S3';
import { useBeforeunload } from 'react-beforeunload';

const WritingSection = styled.section`
  width: 100vw;
  height: 93vh;
  margion-top: 7vh;
  gap: 2rem;
`;
const WritingContainer = styled.div`
  width: 70vw;
  margin-left: 35rem;
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  .toastui-editor-defaultUI {
    border: 0 !important;
    padding: 0 !important;
  }
  .toastui-editor-defaultUI-toolbar {
    background-color: #fff;
    padding: 0 !important;
  }
  .toastui-editor-defaultUI .ProseMirror {
    padding: 0 !important;
  }
  .toastui-editor-ww-container .toastui-editor-contents {
    padding: 0 !important;
    margin-top: 2rem;
  }
`;

const WritingHeader = styled.textarea`
  background: transparent;
  display: block;
  padding: 0px;
  font-size: 2.75rem;
  width: 100%;
  height: 4.2rem;
  resize: none;
  line-height: 1.5;
  outline: none;
  border: none;
  font-weight: bold;
  cursor: text;
`;
const HeaderBar = styled.div`
  background: rgb(73, 80, 87);
  height: 6px;
  width: 4rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 1px;
`
const TagInput = styled.input`
  background: transparent;
  display: inline-flex;
  outline: none;
  cursor: text;
  font-size: 1.125rem;
  line-height: 2rem;
  min-width: 8rem;
  border: none;
`;
const WritingHeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;
const Button = styled.button`
  display: block;
  width: 6rem;
  height: 3.2rem;
  font-size: 1rem;
  text-align: center;
  line-height: 3.2rem;
  background-color: #5f6caf;
  color: #fff;
  border: none;
  border-radius: 22px;
  cursor: pointer;
`;
const Board = styled.div`
  height: 10rem;
  background-color: #fafafa;
  box-shadow: 1px 1px 22px 2px rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  display: flex;
  gap: 1rem;
  overflow: auto;
  width: 70vw;
  flex-wrap: nowrap;
`;
const TagBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  margin-top: 0.75rem;
  gap: 2rem;
  .display {
    display: block;
  }
  .displayNone {
    display: none;
  }
`;
const Select = styled.select`
  border: none;
  background-color: #fff;
  cursor: pointer;
  height: 2rem;
`;
function Writing() {
  useBeforeunload(e => e.preventDefault());
  let data = [];
  //axios bearer token
  const token = window.localStorage.getItem('token');
  let config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  //데이터 불러오기
  const getListData = async () => {
    try {
      await axios.get('http://localhost:8000/api/bookmarks', config).then(res => (data = res.data));
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getListData();
  }, []);

  // Editor DOM 선택용
  const editorRef = useRef();
  //임시 이미지 배열
  let imgArr = [];
  //이미지 업로드
  const onUploadImage = async (blob, callback) => {
    S3Upload(blob);
    imgArr.push(blob.name);
    const url = `https://elice-react-project-team1.s3.ap-northeast-2.amazonaws.com/upload/${blob.name}`;
    setTimeout(() => callback(url, '이미지'), 1000);
  };
  // 보드 상태 변경
  const [board, setBoard] = useRecoilState(boardState);
  // DnD
  const [{ isOver }, dropToAdd] = useDrop(() => ({
    accept: 'card',
    drop: item => addToBoard(item.id),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  // 보드에 리스트 추가
  const addToBoard = id => {
    const items = data.filter(e => id === e.bookmarkId);
    setBoard(board => [...board, items[0]]);
    //하나로 바꾸기
    // setBoard([items[0]]);
  };
  //제목 상태관리
  let header = '';
  const handleHeader = e => {
    header = e.target.value;
  };
  //도시 카테고리 상태관리
  const [CityTagToggle, setCityTagToggle] = useState(true);
  const handleTagChange = e => {
    setCityTagToggle(!CityTagToggle);
    setCateTag([e.target.value]);
  };
  //태그 리스트 상태관리
  const [TagList, setTagList] = useRecoilState(tagState);
  const [value, setValue] = useState('');
  const [randomId, setRandomId] = useState(0);
  //랜덤 아이디 생성
  useEffect(() => {
    setRandomId(new Date().getTime());
  }, [TagList]);
  // 입력값 상태관리
  const getValue = e => {
    setValue(e.target.value);
  };
  const tagInputRef = useRef();
  //태그 상태 관리
  const handleTag = e => {
    e.preventDefault();
    tagInputRef.current.value = '';
    setTagList([...TagList, { id: randomId, tag: value }]);
  };
  // Lift-up
  const [cateTag, setCateTag] = useState([]);
  const changeCateTag = e => {
    setCateTag([]);
  };
  const changeToggle = e => {
    setCityTagToggle(!CityTagToggle);
  };
  const cityArr = [
    '도시를 선택하세요!',
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '경기',
    '강원',
    '충북',
    '충남',
    '전북',
    '전남',
    '경북',
    '경남',
    '제주특별자치도',
    '세종특별자치시',
  ];
  // 등록 버튼 핸들러
  const handleButton = () => {
    //데이터 포스팅
    const postData = async () => {
      const data = await axios
        .post(
          'http://localhost:8000/api/posts/register',
          {
            title: header,
            content: editorRef.current?.getInstance().getHTML(),
            flagHideYN: 'Y',
          },
          config,
        )
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    };
    postData();
  };
  return (
    <WritingSection>
      <WritingSidebar />
      <WritingContainer>
        <Board ref={dropToAdd}>
          {[...new Set(board)].map(e => {
            return (
              <WritingBoardList
                bookmarkId={e.bookmarkId}
                placeName={e.placeName}
                placeUrl={e.placeUrl}
                bookmarkMemo={e.bookmarkMemo}
                categoryGroupName={e.categoryGroupName}
              />
            );
          })}
        </Board>
        <WritingHeaderBox>
          <WritingHeader onChange={handleHeader} placeholder="제목을 입력하세요"></WritingHeader>
          <Button onClick={handleButton}>발행</Button>
        </WritingHeaderBox>
        <HeaderBar />
        <TagBox>
          {cateTag.length
            ? cateTag.map(e => {
                return (
                  <CityTag changeToggle={changeToggle} changeCateTag={changeCateTag} city={e} />
                );
              })
            : ''}
          <Select
            className={CityTagToggle ? 'display' : 'displayNone'}
            onChange={e => handleTagChange(e)}
          >
            {cityArr.map(e => {
              return <option value={e}>{e}</option>;
            })}
          </Select>
          {TagList.map(e => {
            return <TagBtn id={e.id} tag={e.tag} />;
          })}
          <form onSubmit={handleTag}>
            <TagInput
              ref={tagInputRef}
              onChange={getValue}
              placeholder="태그를 입력하세요"
              type="text"
            ></TagInput>
          </form>
        </TagBox>
        <Editor
          ref={editorRef}
          initialValue="여기에 이야기를 적어보세요!"
          previewStyle="vertical"
          initialEditType="wysiwyg"
          plugins={[colorSyntax]}
          height="50rem"
          hooks={{
            addImageBlobHook: onUploadImage,
          }}
        />
      </WritingContainer>
    </WritingSection>
  );
}

export default Writing;
