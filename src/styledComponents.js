import styled from 'styled-components'

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${props => (props.isLight ? '#f9f9f9' : '#181818')};
`

export const SavedContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${props => (props.isLight ? '#f9f9f9' : '#0f0f0f')};
`

export const VidCustomButton = styled.button`
  display: flex;
  border: 0px;
  cursor: pointer;
  color: ${props => (props.active ? '#2563eb' : '#64748b')};
  font-weight: bold;
  font-size: 16px;
  margin-right: 10px;
  font-family: 'Roboto';
  margin-top: 0px;
  background-color: transparent;
`

export const SubmitButton = styled.button`
  background-color: #3b82f6;
  color: #ffffff;
  width: 100%;
  font-weight: bold;
  font-size: 16px;
  font-family: 'Roboto';
  border: 0px;
  cursor: pointer;
  border-radius: 16px;
  margin-top: 20px;
  height: 35px;
`

export const NxtwatchAdContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  padding: 20px;
  margin-bottom: 30px;
`

export const HeaderIconNameContainer = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0px;
  width: 100%;
  padding-left: 20px;
  background-color: ${props => {
    const {isLight, activeOption} = props
    if (activeOption === true) {
      if (isLight === true) {
        return '#d7dfe9'
      }
      return '#383838'
    }
    return 'transparent'
  }};
`

export const HeaderOptionIcon = styled.button`
  border: 0px;
  background-color: transparent;
  color: ${props => (props.activeOption ? '#ff0b37' : ' #616e7c')};
  margin-right: 10px;
`

export const HeaderOptionName = styled.p`
  color: ${props => (props.isLight ? '#181818' : ' #f1f1f1')};
  font-weight: ${props => (props.activeOption ? 900 : 400)};
  font-size: 17px;
  align-items: center;
  font-family: 'Roboto';
  display: flex;
  align-items: center;
`

export const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props =>
    props.isLight === true ? '#f9f9f9' : ' #0f0f0f'};
  padding: 20px;
`

export const HeaderReachoutHead = styled.p`
  color: ${props => (props.isLight ? '#1e293b' : '#d7dfe9')};
  font-weight: 500;
  font-size: 18px;
  font-family: 'Roboto';
`

export const HeaderReachoutDescription = styled.p`
  color: ${props => (props.isLight ? '#1e293b' : '#d7dfe9')};
  font-weight: 400;
  font-size: 16px;
  font-family: 'Roboto';
`

export const FailureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
  width: 100%;
  min-height: 90vh;
  background-color: ${props => (props.isLight ? '#f9f9f9' : '#0f0f0f')};
`

export const FailureImage = styled.img`
  width: 300px;
  height: 300px;
`

export const FailureHeading = styled.h1`
  color: ${props => (props.isLight ? '#212121' : '#ffffff')};
  font-weight: bold;
  font-size: 20px;
  font-family: 'Roboto';
`

export const FailureDescription = styled.p`
  color: #64748b;
  font-weight: bold;
  font-size: 18px;
  font-family: 'Roboto';
  text-align: center;
`
export const FailureRetryBtn = styled.button`
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  font-family: 'Roboto';
  background-color: #00306e;
  width: 90px;
  height: 35px;
  cursor: pointer;
  border: 0px;
`

export const VideoItemDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 80%;
  background-color: ${props => (props.isLight ? ' #f9f9f9' : '#0f0f0f')};
  min-height: 100vh;
`

export const PopupBoxHead = styled.p`
  color: ${props => (props.isLight ? '#00306e' : '#212121')};
  font-size: 16px;
  font-family: 'Roboto';
  font-weight: 500;
`

export const PopupBoxCancelButton = styled.button`
  width: 90px;
  height: 35px;
  margin-right: 30px;
  margin-top: 20px;
  cursor: pointer;
  background-color: transparent;
  font-weight: bold;
  border: ${props =>
    props.isLight ? '1px solid #616e7c' : '1px solid  #616e7c'};
  color: #616e7c;
  font-size: 16px;
  font-family: 'Roboto';
`

export const PopupMenuCancelButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  margin-top: 20px;
  cursor: pointer;
  background-color: transparent;
  font-weight: bold;
  border: ${props =>
    props.isLight ? '1px solid #616e7c' : '1px solid  #616e7c'};
  color: #616e7c;
  font-size: 16px;
  font-family: 'Roboto';
`

export const PopupBoxConfirmButton = styled.button`
  width: 90px;
  height: 35px;
  margin-right: 30px;
  margin-top: 20px;
  cursor: pointer;
  background-color: #3b82f6;
  font-weight: bold;
  font-size: 16px;
  border: 0px;
  font-family: 'Roboto';
  color: #ebebeb;
`

export const PopupBoxBtnsContainer = styled.div`
  display: flex;
  justify-content: center;
`
