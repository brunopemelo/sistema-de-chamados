import { useContext } from 'react'
import './header.css'
import { AuthContext } from '../../contexts/auth'
import avatar from '../../assets/avatar.png'

import { Link } from 'react-router-dom'

import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

export default function Header() {

    const { user, signOut } = useContext(AuthContext)

    return (
        <div className="sidebar">
            <div>
                <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="Foto avatar" />
            </div>

            <Link to="/dashboard"><FiHome color="fff" size={24} />Chamados</Link>
            <Link to="/customers"><FiUser color="fff" size={24} />Clientes</Link>
            <Link to="/profile"><FiSettings color="fff" size={24} />Configurações</Link>
            <Link onClick={() => { signOut() }}><FiLogOut color="fff" size={24} />Sair</Link>
        </div>
    )
}
