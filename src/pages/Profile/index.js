import { useState, useContext } from 'react'
import './profile.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import avatar from '../../assets/avatar.png'
import { AuthContext } from '../../contexts/auth'
import { FiSettings, FiUpload } from 'react-icons/fi'
import firebase from '../../services/firebaseConnection'
import { toast } from 'react-toastify'

export default function Profile() {
    const { user, setUser, storageUser } = useContext(AuthContext)

    const [nome, setNome] = useState(user && user.nome)
    const [email] = useState(user && user.email)
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)

    const [imageAvatar, setImageAvatar] = useState(null)

    //validação
    function handleFile(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0]

            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvatar(image)
                setAvatarUrl(URL.createObjectURL(e.target.files[0]))
            } else {
                toast.error("Envie uma imagem do tipo JPEG ou PNG!", { theme: 'dark' })
                setImageAvatar(null)
                return null
            }
        }
    }

    //upload da imagem
    async function handleUpload() {
        const currentUid = user.uid
        const uploadTask = await firebase.storage()
            .ref(`images/${currentUid}/${imageAvatar.name}`)
            .put(imageAvatar)
            .then(async () => {
                await firebase.storage().ref(`images/${currentUid}`)
                    .child(imageAvatar.name).getDownloadURL()
                    .then(async (url) => {
                        let urlFoto = url
                        await firebase.firestore().collection('users')
                            .doc(user.uid)
                            .update({
                                avatarUrl: urlFoto,
                                nome: nome
                            })
                            .then(() => {
                                let data = {
                                    ...user,
                                    avatarUrl: urlFoto,
                                    nome: nome
                                }
                                setUser(data)
                                storageUser(data)
                                toast.success("Foto enviada com sucesso!", { theme: 'dark' })
                            })
                    })
            })
    }

    //upload do nome
    async function handleSave(e) {
        e.preventDefault()

        if (imageAvatar === null && imageAvatar !== '') {
            await firebase.firestore().collection('users')
                .doc(user.uid)
                .update({
                    nome: nome
                })
                .then(() => {
                    let data = {
                        ...user,
                        nome: nome
                    }
                    setUser(data)
                    storageUser(data)
                })
                .catch(() => {

                })
        } else if (nome !== '' && imageAvatar !== null) {
            handleUpload()
        }
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title name="Meu perfil">
                    <FiSettings size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSave}>
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#fff" size={25} />
                            </span>

                            <input type="file" accept="image/*" onChange={handleFile} /><br />
                            {avatarUrl === null ?
                                <img src={avatar} width="250" height="250" alt="Foto de perfil do usuário" />
                                :
                                <img src={avatarUrl} width="250" height="250" alt="Foto de perfil do usuário" />
                            }
                        </label>

                        <label>Nome:</label>
                        <input type="text" onChange={(e) => setNome(e.target.value)} value={nome} />

                        <label>E-mail:</label>
                        <input type="text" value={email} disabled={true} />

                        <button type="submit">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
