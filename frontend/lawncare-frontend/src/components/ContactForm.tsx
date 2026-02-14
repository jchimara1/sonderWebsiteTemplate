
import {Controller, useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TextField, Button, MenuItem, Box, Typography } from '@mui/material';
import axiosInstance from "../utils/AxiosInstance.ts";

// Yup schema
const contactFormSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
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

const customersURI = `${import.meta.env.VITE_API_URL}api/customers`;



type EmailPayload = { email: string; name?: string };

const sendEmail = async (payload: EmailPayload) => {
    return  await fetch("/api/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),

})};



// TypeScript type
export type ContactFormFields = {
    firstName: string;
    email: string;
    phone: string;
    message: string;
    serviceType: string;
    address: string;
    preferredContact: 'email' | 'phone';
};








// Component
const BasicMuiForm = () => {
    const {control, register, handleSubmit,getValues, setValue,formState: { errors } } = useForm<ContactFormFields>({
        defaultValues: {
            firstName: '',
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

        try {
            console.log("about to call backend");
            const res = await sendEmail({email:getValues('email'), name:getValues('firstName')})
            console.log("backend response", res.status);
        } catch (e) {
            console.error("fetch failed", e);
        }

        setValue('firstName', '')
        setValue('email', '')
        setValue('message', '')
        setValue('phone', '')
        setValue('address', '')
        setValue('serviceType', '')
        setValue('serviceType', '')
        setValue('preferredContact', 'email')
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
<Box display={'flex'} flexDirection={'row'} >
            <TextField
                {...register('firstName')}
                label="Name"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                fullWidth
            />

            <TextField
                {...register('email')}
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth

            />

</Box>

            <Box display={'flex'} flexDirection={'row'}>
            <TextField
                {...register('phone')}
                label="Phone"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                fullWidth
            />

            <TextField
                {...register('address')}
                label="Address"
                error={!!errors.address}
                helperText={errors.address?.message}
                fullWidth
            />


            </Box>


            <TextField
                select
                {...register('serviceType')}
                label="Select a service"
                error={!!errors.serviceType}
                helperText={errors.serviceType?.message}
                defaultValue=""
            >
                <MenuItem value="furniture_removal">Furniture Removal</MenuItem>
                <MenuItem value="appliance_removal">Appliance Removal</MenuItem>
                <MenuItem value="mattress_removal">Mattress Removal</MenuItem>
                <MenuItem value="yard_waste">Yard Waste Removal</MenuItem>
                <MenuItem value="garage_cleanout">Garage Cleanout</MenuItem>
                <MenuItem value="moving_cleanout">Moving Cleanout</MenuItem>
                <MenuItem value="estate_cleanout">Estate Cleanout</MenuItem>
                <MenuItem value="general_junk">General Junk Removal</MenuItem>
                <MenuItem value="not_sure"> Need Estimate</MenuItem>
            </TextField>

            <TextField
                {...register('message')}
                label="Message"
                multiline
                rows={4}
                error={!!errors.message}
                helperText={errors.message?.message}
            />


            <Controller
                name="preferredContact"
                control={control}
                defaultValue="email"
                render={({ field }) => (
                    <TextField
                        select
                        {...field}
                        label="Preferred Contact"
                        error={!!errors.preferredContact}
                        helperText={errors.preferredContact?.message}
                    >
                        <MenuItem value="email">Email</MenuItem>
                        <MenuItem value="phone">Phone</MenuItem>
                    </TextField>
                )}
            />
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Box>
    );
};

export default BasicMuiForm;
