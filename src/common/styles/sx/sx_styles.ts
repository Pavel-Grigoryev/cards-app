export const ContainerSX = {
  justifyContent: 'center',
  alignItems: 'center',
}

export const FormControlSX = {
  justifyContent: 'space-evenly',
  marginTop: '30%',
  padding: '30px 0',
  width: '412px',
  minHeight: '528px',
  backgroundColor: '#FFF',
  boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.1), -1px -1px 2px rgba(0, 0, 0, 0.1)',
}

export const FormLabelSX = {
  color: '#000000',
}

export const FormGroupSX = {
  justifyContent: 'space-around',
  alignItems: 'center',
}

export const FormControlLabelSX = {
  alignSelf: 'flex-start',
  marginLeft: '30px',
}
export const PassRecoveryFormControlSX = {
  ...FormControlSX,
  minHeight: '456px',
}

export const PassRecoveryFormGroupSX = {
  ...FormGroupSX,
  height: '300px',
}

export const SearchPaperSX = {
  p: '2px 4px 2px 16px',
  display: 'flex',
  alignItems: 'center',
  width: '413px',
  height: '36px',
}

export const ProfileChangeAvaButton = {
  position: 'absolute',
  bottom: '0',
  right: '0',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  overflow: 'hidden',
}

//Types

export type SearchPaperSXType = typeof SearchPaperSX
