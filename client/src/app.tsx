import React, { useEffect, useState } from 'react';

interface Column {
    column_name: string;
}

const App: React.FC = () => {
    const [inputData, setInputData] = useState<Record<string, string>>({}); //사용자가 입력한 값
    const [columns, setColumns] = useState<Column[]>([]); //서버에서 가져온 데이터
    const [authSel, setAuthSel] = useState(''); //사용자 입력
    const [authSelServer, setAuthSelServer] = useState(''); //서버 데이터
    const [field, setfield] = useState(''); //사용자 입력


    useEffect(() => {
        fetch('http://localhost:3001/api/users')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setColumns(data);
            })
            .catch((err) => {
                console.error('Error fetching users:', err);
            });
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const send = () => {
        fetch('http://localhost:3001/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData)
        })
            .then(response => response.json())
            .then(data => console.log(data.message))
            .catch((err) => {
                console.error('send fetch error', err)
            })
    }

    const select = () => {
        fetch('http://localhost:3001/select', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: authSel, field: field })
        })
            .then(response => response.json())
            .then(data => setAuthSelServer(data.message))
            .catch((err) => {
                console.error('select fetch error', err)
            })
    }

    return (
        <div>
            {columns.map((column) => (
                <div key={column.column_name}>
                    <label>
                        {column.column_name}:
                        <input type="text" name={column.column_name} value={inputData[column.column_name]} onChange={handleChange} />
                    </label>
                </div>
            ))}
            <button onClick={send}>전송하기</button>
            <div>
                <label>
                    사용자 이름 조회:
                    <input type="text" value={authSel} onChange={(ele) => setAuthSel(ele.target.value)} />
                </label>
                <label>권한 부여
                    <input type="text" value={field} onChange={(ele) => setfield(ele.target.value)} />
                </label>
                <button onClick={select}>조회하기</button>
                <div>{authSelServer}</div>
            </div>
        </div>
    );
};

export default App;