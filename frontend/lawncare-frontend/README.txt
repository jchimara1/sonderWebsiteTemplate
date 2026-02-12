Website template with Email Capabilities

# Database

As of now I am using render to host my database. You can spin up a free database on render and then from there you will need to save the internal database url / username / password to the backend environment variables in render.

#  Backend

I created a barebone backend that could be applied to several businesses taking into account CORs and Contact requesting from users on the frontend you will have to export the environment variables that are in render to replicated the functionality. Then add any variables that you are referencing in code to your .ZSHRC and Application yaml file. You will have to add the resend dependency to the build.gradle file in the backend ultimately you can clone the sampleBackend project because it has email configuration inside of it already and any other relevant information.

### within my project there are several variables that were added to aid in the debugging process that took place before I began to use resend. Most of which will be removed once I identify which ones are no longer needed.

# Frontend

I wrapped my frontend with my backend in the same project. I like having it that way in local although it doesn’t really matter as much in production. In the frontend the only environment variable that is needed is
VITE_API_URL and this is used when making the post request to the backend to then send the email.

# Resend

When adding a domain make sure that you add the both sending variables and the DKIM.

Going forward the place that it currently in I can begin to fork from that point when going forward but I will begin to implement additional features and if I believe these to be baseline then I will probably add them to the project.
