import User from "../models/User";



export const getLogin = async(req,res) =>{

}

export const postLogin = async (req,res) => {
    const { username, password } = req.body;
    console.log(req.body)
    // MySQL 데이터베이스에서 사용자 정보를 확인합니다.
    connection.query('SELECT * FROM user WHERE userName = ? AND userPassword = ?', [username, password], (error, results) => {
        if (error) {
            console.error('MySQL 쿼리 오류:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
        else if (Array.isArray(results)) {
            // 사용자 정보가 없으면 로그인 실패 처리를 합니다.
            if (results.length === 0){
                console.log(username,password)
                res.status(401).json({ success: false, message: 'Invalid username or password' });
            }
            else {
                // 로그인 성공 처리를 합니다.
                req.session.username = username
                res.json({ success: true, message: 'Login successful', user: username });
                
            }
        }
    });
}


export const getSignup = async (req,res) =>{

}

export const postSignup =  async (req,res) => {
    console.log(req.body);
    const { user_id, user_pw, user_email, user_name, phone_number } = req.body;
    const user_lv =1
    // MySQL 데이터베이스에서 사용자 정보를 확인합니다.
    connection.query('SELECT * FROM user WHERE userName = ?', [user_id], (error, results) => {
        if (error) {
            console.error('MySQL 쿼리 오류:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
        else if (Array.isArray(results) && results.length != 0) {
            // 사용자 정보가 없으면 로그인 실패 처리를 합니다.
            res.status(401).json({ success: false, message: 'user_id is Exit' });
        }
        else {
            // 로그인 성공 처리를 합니다.
            try {
                // 새로운 사용자 추가
                connection.query(
                  `INSERT INTO user (userName, userPassword,user_level,user_email,name,phone_num) VALUES ('${user_id}', '${user_pw}', '${user_lv}', '${user_email}', '${user_name}', '${phone_number}')`
                );
                const animal_list = [];
                const post = { user_id: user_id, animals: animal_list };
                User.crate(
                    {
                       user_id,
                       animals
                    }
                )
                res.json({ success: true, message: 'regester successful', user: user_id });
            }
            catch (err) {
                console.error('MySQL 에러:', err);
                res.status(500).send('MySQL 에러');
            }
        }
    });
}

export const logout = (req,res) => {
    req.session.destroy()
    res.status(200).sand("logout Clear")
}
