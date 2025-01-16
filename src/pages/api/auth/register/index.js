import db from '@/libs/db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {

    if (req.method !== 'POST') {
         return res.status(405).json({ error: 'Método no permitido' });
    }

    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({error: 'Todos los campos son obligatorios.'});
        }
        
        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailFormat.test(email)) {
            return res.status(400).json({ error: 'El correo electrónico no tiene un formato válido.' });
        }

        if (password.length < 8) {
            return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres.' });
        }

        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await db.users.create({
            data: {
                fullName: fullName.trim(),
                email: email.trim(),
                password: hashedPassword,
            },
        });

        return res.status(201).json({ 
            message: 'Usuario registrado con éxito', 
            data: { id: newUser.id, fullName: newUser.fullName, email: newUser.email },
        });


    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  