import { useEffect, useState } from "react";
import {addDoc, collection, deleteDoc, getDocs,doc, updateDoc, getDoc} from 'firebase/firestore'
import {db} from '../firebase';

const Home = ()=>{  
    const [data, setData] = useState({name:"",email:"",contact:""});

    const [users, setUsers] = useState([]);
    const useCollectionRef = collection(db, 'contacts');


    useEffect( ()=>{

        const getUsers = async () =>{
             const data = await getDocs(useCollectionRef);
             const res = [];
             const record = data.docs.map((docs)=>{
                 res.push({
                    id : docs.id,
                    ...docs.data()
                 })
             })
            setUsers(res)
        }

        setTimeout(()=>{

            getUsers();
        },2000)
    },[])

    const changeInput = (e) =>{
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,[name]:value
        })
    }

    const submitData = async (e) =>{
        e.preventDefault();
        await addDoc(useCollectionRef, data);
        
    }

    const deleteRecord = async (id) =>{

        const cityRef = doc(db, 'contacts', id);
        await deleteDoc(cityRef)
    }

    const updateRecord = async (id) =>{
        const citydd = doc(db, 'contacts',id);
        let updateData =await getDoc(citydd);
        console.log(updateData.data());
        setData(updateData.data())
    }
    return(
        <div>
            <form method="post" onSubmit={(e)=>submitData(e)}>
            <h1 style={{textAlign : "center"}}>Crud OP</h1>
            <table border="1" align="center">
                <tr>
                    <td>ENter Name:</td>
                    <td><input type="text" name="name" value={data.name} onChange={(e)=>changeInput(e)}/></td>
                </tr>

                <tr>
                    <td>ENter Email:</td>
                    <td><input type="text" name="email" onChange={(e)=>changeInput(e)}/></td>
                </tr>

                <tr>
                    <td>ENter Contact:</td>
                    <td><input type="text" name="contact" onChange={(e)=>changeInput(e)}/></td>
                </tr>

                <tr>
                    <td></td>
                    <td><input type="submit" name="submit" value="Insert Record" /></td>
                </tr>
            </table>

            </form>
            {users.map((v,index)=>{
               return( <tr>
                    <td>{v.id}</td>
                    <td>
                        <button onClick={(e)=>deleteRecord(v.id)}>Delete</button> || 
                        <button onClick={(e)=>updateRecord(v.id)}>update</button>
                    </td>
                </tr>)
            })}
        </div>
    )
}

export default Home;