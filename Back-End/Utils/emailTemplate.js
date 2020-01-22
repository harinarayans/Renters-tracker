module.exports = {
    AccountVerification: {
        Subject: 'Renters – Account Verification',
        Body: `Hi {FirstName} {LastName},<br/>
            <p>To activate your Renters account please follow below link - <br/>
            <h4>{AccountActivationLink}</h4>
            <br/>Thanks Renters Team`
    },
    ResetPassword: {
        Subject: 'Renters – Account Recovery',
        Body: `Dear {FirstName} {LastName} 
            <p>You recently requested to reset your password for your Renters account. Please click the link below to reset it<br><h4> {AccountRecoveryLink} </h4><br>If you did not request a password reset, please ignore this email.</p><br> <p>Thanks<br> Renters Team </p>
            <br/><br/>Thank You
            <br/>Thanks Renters Team`
    }
}