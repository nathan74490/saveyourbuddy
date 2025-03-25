# Installation et accès à phpMyAdmin

## Accéder à phpMyAdmin depuis un autre appareil

Sur un appareil connecté au même réseau Wi-Fi, ouvrez un navigateur et entrez l'URL suivante :

http://192.168.4.60/phpmyadmin

Vous aurez alors accès à phpMyAdmin.

## Explication des étapes de configuration rapide mis en place par Eliott et Killian.

1. **Installez XAMPP (ou WAMP)** sur votre machine.
2. **Démarrez Apache et MySQL** via le panneau de contrôle de XAMPP (ou WAMP).
3. **Modifiez la configuration d'Apache** pour autoriser l'accès distant :
   - Allez dans `C:\xampp\apache\conf\extra\httpd-xampp.conf`.
   - Remplacez `Require local` par `Require all granted` dans la section :
     ```apache
     <Directory "C:/xampp/phpmyadmin">
         AllowOverride All
         Require all granted
     </Directory>
     ```
4. **Redémarrez Apache** via le panneau de contrôle XAMPP.

5. **Obtenez votre adresse IP locale** en tapant `ipconfig` dans l'invite de commande. Par exemple, l'IP peut être `192.168.4.60`.


