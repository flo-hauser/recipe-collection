function confiremdPasswordMatches(password: string, confirmed: string) {
  return password == confirmed || "Passwort Eingaben stimmen nicht überein";
}

function required(v: string) {
  return !!v || "Eingabe erforderlich";
}

function isEmail(v: string) {
  return (
    !v ||
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
    "gültige E-mail angeben"
  );
}

export { confiremdPasswordMatches, required, isEmail };
