const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let users = []; // Simulación de una base de datos en memoria

// Registro de usuario
exports.register = async (req, res) => {
    console.log(req.body);
    ////extraigo los parametros recibidos por post
    const { username, password } = req.body;
    ////en caso de que el usuario ya exista
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
    }
    ////encriptandig
    const hashedPassword = await bcrypt.hash(password, 10);
    //creando el objeto usuario
    const newUser = { username, password: hashedPassword };
    //pasandolo al arreglo
    users.push(newUser);
//
    //res.status(201).json({ message: 'Usuario registrado exitosamente' });
};

// Login de usuario
exports.login = async (req, res) => {
    //extraigo los parametros recibidos por post
    const { username, password } = req.body;
    //busco un usuario dentro del arrelgo que coincida
    const user = users.find(user => user.username === username);
    //si no esta devuelvo la respuesta del usuarios no existe
    if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
    }
    //si lo encontré verifico la contraseña recibida con la que tengo almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    //si no son iguales mando alv por la contraseña
    if (!isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
    }
    
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

// Endpoint protegido
exports.getProtectedData = (req, res) => {
    res.json({ message: `Hola, ${req.user.username}, aquí está tu información protegida.` });
};
exports.saludo = (req, res) => {
    res.json({ mensaje: "Hola desde la API"});
};
