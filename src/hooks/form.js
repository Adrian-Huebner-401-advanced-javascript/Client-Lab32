import React, { useEffect, useState } from 'react';
import Q from '@nmq/q/client';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

const useForm = cb => {
  const [values, setValues] = useState({});

  const handleChange = e => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  const handleSubmit =  e => {
    e.preventDefault();
    e.target.reset();

    Q.publish('deeds', 'work', values);
    socket.emit('words', values);
  }

  useEffect(() => {
    console.log('useEffect form is here');
  }, [cb]);

  return [handleChange, handleSubmit, values]
}

export default useForm;