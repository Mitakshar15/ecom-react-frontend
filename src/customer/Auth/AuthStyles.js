export const authStyles = {
  formContainer: {
    maxWidth: 500,
    margin: 'auto',
    padding: '2rem',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  inputField: {
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#9155FD',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#9155FD',
      }
    }
  },
  submitButton: {
    padding: '.8rem 0',
    backgroundColor: '#9155FD',
    '&:hover': {
      backgroundColor: '#804DE2',
    }
  },
  linkText: {
    color: '#666',
    fontSize: '0.875rem'
  }
}; 