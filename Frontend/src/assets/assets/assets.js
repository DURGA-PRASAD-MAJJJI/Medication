import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.jpg'
import contact_image from './contact_image.jpg'
import about_image from './about_image.jpg'
import logo from './logo.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
//import doc15 from './doc15.jpg'
import Dermatologist from './Dermatologist.png'
import Gastroenterologist from './Gastroenterologist.png'
import General_physician from './General_physician.png'
import Gynecologist from './Gynecologist.png'
import Neurologist from './Neurologist.png'
import Pediatricians from './Pediatricians.png'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Raghavendra Rao',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS, MD',
        experience: '8 Years',
        about: 'Dr. Raghavendra Rao is a dedicated general physician with a strong focus on preventive healthcare, accurate diagnosis, and effective treatment strategies. He has extensive experience in managing chronic diseases and promoting overall well-being.',
        fees: 500,
        address: {
            line1: '10th Cross, Danavaipeta',
            line2: 'Rajahmundry, Andhra Pradesh'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Keerthi Reddy',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS, DGO',
        experience: '6 Years',
        about: 'Dr. Keerthi Reddy specializes in women’s health, including prenatal care, high-risk pregnancies, and gynecological surgeries. She is committed to providing compassionate care and promoting reproductive health awareness.',
        fees: 600,
        address: {
            line1: '12th Cross, Danavaipeta',
            line2: 'Rajahmundry, Andhra Pradesh'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Sandeep Varma',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS, MD (Dermatology)',
        experience: '5 Years',
        about: 'Dr. Sandeep Varma is a skilled dermatologist specializing in skin disorders, cosmetic procedures, and laser treatments. He is known for his patient-centric approach and advanced dermatological treatments.',
        fees: 450,
        address: {
            line1: '15th Cross, Danavaipeta',
            line2: 'Rajahmundry, Andhra Pradesh'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Nithin Kumar',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS, MD (Pediatrics)',
        experience: '7 Years',
        about: 'Dr. Nithin Kumar is a compassionate pediatrician specializing in child healthcare, immunizations, and neonatal care. He focuses on early diagnosis and treatment to ensure the well-being of children.',
        fees: 550,
        address: {
            line1: '18th Cross, Danavaipeta',
            line2: 'Rajahmundry, Andhra Pradesh'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Ananya Priya',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS, DM (Neurology)',
        experience: '10 Years',
        about: 'Dr. Ananya Priya is a leading neurologist with expertise in treating neurological disorders, including stroke, epilepsy, and migraines. She is dedicated to providing advanced neurological care with a patient-focused approach.',
        fees: 800,
        address: {
            line1: '20th Cross, Danavaipeta',
            line2: 'Rajahmundry, Andhra Pradesh'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Venkatesh Babu',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS, DM (Neurology)',
        experience: '9 Years',
        about: 'Dr. Venkatesh Babu specializes in treating complex neurological conditions with a focus on brain and spine disorders. He has vast experience in neurodiagnostics and rehabilitation therapies.',
        fees: 750,
        address: {
            line1: '22nd Cross, Danavaipeta',
            line2: 'Rajahmundry, Andhra Pradesh'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Vishnu Teja',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS, MD',
        experience: '6 Years',
        about: 'Dr. Vishnu Teja is committed to delivering holistic medical care by focusing on early diagnosis and effective treatment of general health conditions. His expertise includes lifestyle counseling and chronic disease management.',
        fees: 500,
        address: {
            line1: '24th Cross, Danavaipeta',
            line2: 'Rajahmundry, Andhra Pradesh'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Meghana Reddy',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS, MS (Obstetrics & Gynecology)',
        experience: '8 Years',
        about: 'Dr. Meghana Reddy has extensive experience in handling high-risk pregnancies, infertility treatments, and laparoscopic gynecological surgeries. She prioritizes women’s health and well-being with a patient-friendly approach.',
        fees: 700,
        address: {
            line1: '26th Cross, Danavaipeta',
            line2: 'Rajahmundry, Andhra Pradesh'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Rajeshwar Rao',
        image: doc9,
        speciality: 'Gastroenterologist',
        degree: 'MBBS, DM (Gastroenterology)',
        experience: '9 Years',
        about: 'Dr. Rajeshwar Rao is an expert in diagnosing and treating digestive system disorders, liver diseases, and gastric issues. He employs advanced endoscopic techniques for effective treatments.',
        fees: 650,
        address: {
            line1: '28th Cross, Danavaipeta',
            line2: 'Rajahmundry, Andhra Pradesh'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Karthik Sai',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS, MD (Pediatrics)',
        experience: '5 Years',
        about: 'Dr. Karthik Sai is a highly skilled pediatrician known for his expertise in child development, vaccinations, and nutritional guidance. His approach emphasizes preventive care and early intervention.',
        fees: 500,
        address: {
            line1: '30th Cross, Danavaipeta',
            line2: 'Rajahmundry, Andhra Pradesh'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Niharika Devi',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS, DM (Neurology)',
        experience: '7 Years',
        about: 'Dr. Niharika Devi specializes in diagnosing and treating neurological conditions such as multiple sclerosis, Alzheimer’s disease, and movement disorders. She focuses on personalized treatment plans for her patients.',
        fees: 750,
        address: {
            line1: '32nd Cross, Danavaipeta',
            line2: 'Rajahmundry, Andhra Pradesh'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Aravind Chandra',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS, DM (Neurology)',
        experience: '10 Years',
        about: 'Dr. Aravind Chandra is a senior neurologist with expertise in managing stroke rehabilitation, Parkinson’s disease, and epilepsy. He provides comprehensive neurological care with a multidisciplinary approach.',
        fees: 800,
        address: {
            line1: '34th Cross, Danavaipeta',
            line2: 'Rajahmundry, Andhra Pradesh'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Sneha Lakshmi',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS, MD',
        experience: '7 Years',
        about: 'Dr. Sneha Lakshmi is known for her expertise in managing lifestyle disorders such as diabetes, hypertension, and thyroid diseases. She emphasizes holistic healthcare and preventive strategies.',
        fees: 550,
        address: {
            line1: '36th Cross, Danavaipeta',
            line2: 'Rajahmundry, Andhra Pradesh'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Varun Reddy',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS, DGO',
        experience: '6 Years',
        about: 'Dr. Varun Reddy is a skilled gynecologist specializing in maternal-fetal medicine, infertility treatments, and gynecological surgeries. He provides patient-centered care with advanced medical expertise.',
        fees: 600,
        address: {
            line1: '38th Cross, Danavaipeta',
            line2: 'Rajahmundry, Andhra Pradesh'
        }
    }
];

