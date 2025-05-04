import { db } from "@/firebase/config"
import {
    collection,
    addDoc,
    query,
    where,
    getDocs
} from "firebase/firestore"
import { Admin } from "../models/admin"

const adminRef = collection(db, "admin")

class AdminServices {

    async registerAdmin(admin: Admin) {
        return await addDoc(adminRef, admin)
    }

    async loginAdmin(admin: Admin) {
        try {
            const q = query(
                adminRef,
                where("email", "==", admin.email), 
                where("password", "==", admin.password) ,
                where("role", "==", admin.role)
            )

            const querySnapshot = await getDocs(q)

            if (querySnapshot.empty) {
                throw new Error("Admin not found or incorrect credentials")
            }

            const adminDoc = querySnapshot.docs[0].data() as Admin
            return adminDoc // You can return the admin data or a success message

        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(error.message || "Login failed")
            } else {
                throw new Error("An unknown error occurred during login")
            }
        }
    }
    
}

export default new AdminServices()