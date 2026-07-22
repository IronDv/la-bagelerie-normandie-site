## Objectif

Connecter le formulaire de contact pour que chaque message envoyé depuis le site arrive dans la boîte mail **irondrevon.pro@gmail.com**.

## Approche

Utiliser l'infrastructure email intégrée de Lovable Cloud (aucun compte tiers, aucune clé API à gérer). Le formulaire enverra deux emails à chaque soumission :
1. **Notification** vers irondrevon.pro@gmail.com avec le contenu du message (nom, email, téléphone, message).
2. **Confirmation** automatique vers le client qui vient d'écrire, aux couleurs de La Bagelerie.

## Étapes

1. **Activer Lovable Cloud** (prérequis pour l'envoi d'emails).
2. **Configurer un domaine d'envoi** : un email professionnel doit partir d'un domaine que vous possédez (ex. `notify.labagelerie.fr`). Une boîte de dialogue s'ouvrira pour brancher le domaine.  
   ⚠️ Sans domaine vérifié, l'envoi ne fonctionnera pas. Si vous n'avez pas encore de domaine, il faudra en acquérir un.
3. **Créer deux templates d'email** :
   - `contact-notification` (destiné à vous) : reprend les infos du formulaire.
   - `contact-confirmation` (destiné au client) : remerciement + rappel des horaires.
4. **Créer une route serveur** `/api/public/contact` qui :
   - valide les champs (Zod : nom, email, téléphone optionnel, message, longueurs max),
   - envoie les deux emails via le helper Lovable,
   - retourne succès / erreur.
5. **Brancher le formulaire** existant dans `src/routes/index.tsx` sur cette route (fetch POST, gestion loading / succès / erreur, message d'erreur clair si l'envoi échoue).

## Détails techniques

- Emails envoyés via `sendTemplateEmail` (React Email + Lovable managed API), pas de queue ni de table SQL.
- Endpoint public sécurisé par validation Zod et anti-spam basique (limite de longueur, honeypot optionnel).
- Aucune donnée n'est stockée en base (choix "email uniquement").

## Ce qui n'est PAS inclus

- Pas de tableau de bord admin (messages non stockés).
- Pas de SMS/WhatsApp.
- Pas d'envoi via Gmail/Resend externes.
