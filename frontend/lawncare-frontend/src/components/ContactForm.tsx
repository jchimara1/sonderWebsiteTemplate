
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TextField, Button, MenuItem, Box, Typography } from '@mui/material';
import axiosInstance from "../utils/AxiosInstance.ts";

// Yup schema
const contactFormSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email is required').email('Invalid email'),
    phone: Yup.string()
        .required('Phone number is required')
        .matches(/^\+?\d{7,15}$/, 'Phone is not valid'),
    message: Yup.string().max(1000).required(),
    serviceType: Yup.string().required('Service type is required'),
    address: Yup.string().required('Address is required'),
    preferredContact: Yup.mixed<'email' | 'phone'>()
        .oneOf(['email', 'phone'])
        .required('Preferred contact is required'),
});

const customersURI = `api/customers`;
console.log(customersURI)


type EmailPayload = { email: string; name?: string };

const sendEmail = async (payload: EmailPayload) => {
    const res = await fetch("/api/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const text = await res.text(); // read body no matter what

    if (!res.ok) {
        console.error("Email API failed:", res.status, text);
        throw new Error(`Email request failed: ${res.status} ${text}`);
    }

    console.log("Email API success:", text);
    return text;
};



// TypeScript type
export type ContactFormFields = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    serviceType: string;
    address: string;
    preferredContact: 'email' | 'phone';
};








// Component
const BasicMuiForm = () => {
    const { register, handleSubmit,getValues, setValue,formState: { errors } } = useForm<ContactFormFields>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: '',
            serviceType: '',
            address: '',
            preferredContact: 'phone',
        },
        resolver: yupResolver(contactFormSchema),
    });

const postEvent = async (
        event: ContactFormFields
    ): Promise<ContactFormFields> => {
        const apiResponse = await axiosInstance.post(customersURI, event);

        return apiResponse.data;

    };


    const onSubmit = async (data: ContactFormFields) => {

        await sendEmail({email:getValues('email'), name:getValues('firstName')})


        setValue('firstName', '')
        setValue('email', '')
        setValue('message', '')
        setValue('phone', '')
        setValue('address', '')
        setValue('serviceType', '')
        setValue('lastName', '')
        setValue('preferredContact', 'email')

        setTimeout(()=> {
            alert("Request sent successfully!");
        }, 5000)
        await postEvent(data)
     };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: 500,
                margin: '0 auto',
                mt: 4,
                p: 2,
                border: '1px solid #ccc',
                borderRadius: 2,
                backgroundColor: '#fafafa',
            }}
        >
            <Typography variant="h5" fontWeight="bold" mb={2} sx={{color: 'grey'}}>
                Get A Free Quote
            </Typography>

            <TextField
                {...register('firstName')}
                label="First Name"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
            />

            <TextField
                {...register('lastName')}
                label="Last Name"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
            />

            <TextField
                {...register('email')}
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
            />

            <TextField
                {...register('phone')}
                label="Phone"
                error={!!errors.phone}
                helperText={errors.phone?.message}
            />

            <TextField
                {...register('message')}
                label="Message"
                multiline
                rows={4}
                error={!!errors.message}
                helperText={errors.message?.message}
            />

            <TextField
                {...register('serviceType')}
                label="Service Type"
                error={!!errors.serviceType}
                helperText={errors.serviceType?.message}
            />

            <TextField
                {...register('address')}
                label="Address"
                error={!!errors.address}
                helperText={errors.address?.message}
            />

            <TextField
                select
                {...register('preferredContact')}
                label="Preferred Contact"
                error={!!errors.preferredContact}
                helperText={errors.preferredContact?.message}
            >
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="phone">Phone</MenuItem>
            </TextField>

            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Box>
    );
};

export default BasicMuiForm;
