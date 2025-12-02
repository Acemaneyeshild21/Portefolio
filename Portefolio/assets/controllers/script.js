
        // Simulation de données utilisateur
        const userData = {
            name: "[Ton Nom]",
            role: "Développeur Web",
            avatar: "https://i.pravatar.cc/150?img=32", // Remplace par ton avatar
            notifications: 0
        };

        // Mise à jour de l'interface avec les données utilisateur
        document.addEventListener('DOMContentLoaded', function() {
            const userNameElement = document.getElementById('userName');
            const userAvatarElement = document.getElementById('userAvatar');
            
            if (userNameElement) {
                userNameElement.textContent = userData.name;
            }
            
            if (userAvatarElement && userData.avatar) {
                userAvatarElement.src = userData.avatar;
            }
            
            const dropdownHeader = document.querySelector('.dropdown-header .user-name');
            if (dropdownHeader) {
                dropdownHeader.textContent = userData.name;
            }
            
            // Gestion du dropdown au clic (mobile)
            const userProfile = document.querySelector('.user-profile');
            userProfile.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    this.classList.toggle('active');
                }
            });
            
            // Fermer le dropdown en cliquant ailleurs
            document.addEventListener('click', function(e) {
                if (!userProfile.contains(e.target)) {
                    userProfile.classList.remove('active');
                }
            });
        });

        // Exemple de fonction pour gérer le formulaire de contact
        document.querySelector('#contact form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message envoyé ! (Simulation - Ajoute un backend pour traiter.)');
        });
 