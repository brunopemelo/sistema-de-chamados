import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'

import logo from '../../assets/logo.png'

function SignUp() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signUp, loadingAuth } = useContext(AuthContext)

    function handleSubmit(e) {
        e.preventDefault();

        if (nome !== '' && email !== '' && password !== '') {
            signUp(email, password, nome)
        }
    }

    return (
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="Logo do Sistema" />
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Cadastrar uma conta</h1>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" />
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@email.com" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="******" />
                    <button type="submit">{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
                </form>

                <Link to="/">Já possui uma conta? Entre.</Link>
            </div>
        </div>
    );
}

export default SignUp;
