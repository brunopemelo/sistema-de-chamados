import { useState } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import firebase from '../../services/firebaseConnection'
import { toast } from 'react-toastify'
import { FiUser } from 'react-icons/fi'

export default function Customers() {
    const [nomeFantasia, setNomeFantasia] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [endereco, setEndereco] = useState('')

    async function handleAdd(e) {
        e.preventDefault()
        if (nomeFantasia !== '' && cnpj !== '' && endereco !== '') {
            await firebase.firestore().collection('customers')
                .add({
                    nomeFantasia: nomeFantasia,
                    cnpj: cnpj,
                    endereco: endereco
                })
                .then(() => {
                    setNomeFantasia('')
                    setCnpj('')
                    setEndereco('')
                    toast.info("Empresa cadastrada com sucesso!", { theme: 'dark' })
                })
                .catch((e) => {
                    toast.success("Ops, erro ao cadastrar!" + e, { theme: 'dark' })
                })
        } else {
            toast.error("Preencha todos os campos!", { theme: 'dark' })
        }
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Clientes">
                    <FiUser size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile customers" onSubmit={handleAdd}>
                        <label>Nome fantasia:</label>
                        <input type="text" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} placeholder="Nome da sua empresa" />

                        <label>CNPJ:</label>
                        <input type="text" value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="Seu CNPJ" />

                        <label>Endereço:</label>
                        <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder="Endereço da empresa" />

                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
