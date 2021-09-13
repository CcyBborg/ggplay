import { useState, useCallback } from 'react';

function SignUpForm({
   onCreateUser,
   selectedGame,
   selectedRank,
   error
}) {
   const [nickname, setNickname] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const formOauthURL = useCallback(url => {
      if (selectedRank) {
         return `${url}?game=${selectedGame}&rank=${selectedRank}`;
      } else {
         return `${url}?game=${selectedGame}`;
      }
   }, [selectedGame, selectedRank]);

   return (
      <div className='sign-in-page'>
         <div className='sign-user_card mt-5'>
            <div className='sign-in-page-data'>
               <div className='sign-in-from w-100 m-auto'>
                  <h3 className='mb-3 text-center'>Регистрация</h3>
                  <p className='text-center mb-4'>Присоединяйтесь с помощью социальных сетей</p>
                  <div className='d-flex justify-content-between'>
                     <button className='btn btn-hover btn-vk' onClick={() => {
                        if (process?.env?.NODE_ENV === 'development') {
                           window.open(formOauthURL('http://localhost:5000/users/auth/vkontakte'), '_self');
                        } else {
                           window.open(formOauthURL('/users/auth/vkontakte'), '_self');
                        }
                     }}>
                        <i className='fab fa-vk'></i>
                     </button>
                     <button className='btn btn-hover btn-discord' onClick={() => {
                        if (process?.env?.NODE_ENV === 'development') {
                           window.open(formOauthURL('http://localhost:5000/users/auth/discord'), '_self');
                        } else {
                           window.open(formOauthURL('/users/auth/discord'), '_self');
                        }
                     }}>
                        <i className='fab fa-discord'></i>
                     </button>
                  </div>
                  <p className='text-center mt-4'>или вашей почты</p>
                  <form className='mt-4' action='index.html'>
                     <div className='form-group'>
                        <input
                           type='text'
                           onChange={e => setNickname(e.target.value)}
                           value={nickname}
                           className='form-control mb-0'
                           id='exampleInputEmail1'
                           placeholder='Никнейм'
                           autocomplete='off'
                           required />
                     </div>
                     <div className='form-group'>
                        <input
                           type='email'
                           onChange={e => setEmail(e.target.value)}
                           value={email}
                           className='form-control mb-0'
                           id='exampleInputEmail1'
                           placeholder='Электронная почта'
                           autocomplete='off'
                           required />
                     </div>
                     <div className='form-group'>
                        <input
                           type='password'
                           onChange={e => setPassword(e.target.value)}
                           value={password}
                           className='form-control mb-0'
                           id='exampleInputPassword2'
                           placeholder='Пароль'
                           required />
                     </div>
                     {typeof error === 'string' && (
                        <div className="text text-primary mb-3">
                           {error}
                        </div>
                     )}
                     <div className='sign-info'>
                        <button
                           type='submit'
                           className='btn btn-hover btn-block'
                           onClick={e => {
                              e.preventDefault();
                              onCreateUser({ email, nickname, password });
                           }}>
                           Зарегистрироваться
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}

export default SignUpForm;
