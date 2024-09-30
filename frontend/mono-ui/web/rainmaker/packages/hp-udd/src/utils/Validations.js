export const CommonFunctions = () => { 
    
    const addressField = (e) => {
        let value = e.target.value;
        let re = /[`~!@$%^&*|+=?;:'"<>\[\]]/gi;
        let isSplChar = re.test(value);
        if (isSplChar) {
          value = value.replace(re, '');
          setError('Please, Enter Alphanumeric with Space /,.()#_- only please.');
        } else {
          setError('');
        }
        if (value.length > max) {
          value = value.substr(0, max);
          setError('Please, Enter less than 150 characters.');
        }
        setInputValue(value);
    };
    
    
    return {
       
    };
}