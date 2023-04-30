import React from 'react'
import styled from 'styled-components'

const ErrorContainer = styled.div`
text-align: center;
margin-top: 10%;
`
// 에러 페이지
function Error() {
  return (
    <ErrorContainer>
      <h1>해당 페이지를 찾을 수 없습니다.</h1>
      <h4>웹 주소가 올바른지 확인하거나 다른 링크를 사용해 원하는 페이지로 이동해 보세요.</h4>
    </ErrorContainer>
  )
}

export default Error