import React, { PureComponent } from 'react';
import ReactNative, { CheckBox, ScrollView, View, Text } from 'react-native';


export class PrivacyPolicyScreen extends PureComponent {

    constructor(props, context) {
        super(props, context);
    }

    handleAnalyticsCheckboxChanged = (value) => {
        const { setAnalyticsCollectionEnabled } = this.props;

        setAnalyticsCollectionEnabled && setAnalyticsCollectionEnabled(value);
    };

    en = () => {
        const { styles } = this.props;

        return (
            <View style={styles.content}>
                <Text style={[styles.heading, styles.italic]}>Like all poetic masterpieces of modern times, the our privacy policy cannot be translated without loss of all the profound intricacies. Therefore, we present you the German original to admire.</Text>

                { this.de() }
            </View>
        );
    };

    de = () => {
        const { styles } = this.props;

        return (
            <View style={styles.content}>
                <Text style={styles.heading}>Geltungsbereich</Text>
                <Text style={styles.paragraph}>Diese Datenschutzerklärung klärt Nutzer über die Art, den Umfang und Zwecke der Erhebung und Verwendung personenbezogener Daten durch den verantwortlichen Anbieter in dieser App (im folgenden “Angebot”) auf.</Text>
                <Text style={styles.paragraph}>Die rechtlichen Grundlagen des Datenschutzes finden sich im Bundesdatenschutzgesetz (BDSG) und dem Telemediengesetz (TMG).</Text>

                <Text style={styles.heading}>Umgang mit personenbezogenen Daten</Text>
                <Text style={styles.paragraph}>Personenbezogene Daten sind Informationen, mit deren Hilfe eine Person bestimmbar ist, also Angaben, die zurück zu einer Person verfolgt werden können. Dazu gehören der Name, die Emailadresse oder die Telefonnummer. Aber auch Daten über Vorlieben, Hobbies, Mitgliedschaften oder welche Webseiten von jemandem angesehen wurden zählen zu personenbezogenen Daten.</Text>
                <Text style={styles.paragraph}>Personenbezogene Daten werden von uns nur dann erhoben, genutzt und weiter gegeben, wenn dies gesetzlich erlaubt ist oder die Nutzer in die Datenerhebung einwilligen.</Text>

                <Text style={styles.heading}>Einbindung von Diensten und Inhalten Dritter</Text>
                <Text style={styles.paragraph}>Es kann vorkommen, dass innerhalb dieses Onlineangebotes Inhalte Dritter, wie zum Beispiel Videos von YouTube, Kartenmaterial von Google-Maps, RSS-Feeds oder Grafiken von anderen Webseiten eingebunden werden. Dies setzt immer voraus, dass die Anbieter dieser Inhalte (nachfolgend bezeichnet als "Dritt-Anbieter") die IP-Adresse der Nutzer wahr nehmen. Denn ohne die IP-Adresse, könnten sie die Inhalte nicht an den Browser des jeweiligen Nutzers senden. Die IP-Adresse ist damit für die Darstellung dieser Inhalte erforderlich. Wir bemühen uns nur solche Inhalte zu verwenden, deren jeweilige Anbieter die IP-Adresse lediglich zur Auslieferung der Inhalte verwenden. Jedoch haben wir keinen Einfluss darauf, falls die Dritt-Anbieter die IP-Adresse z.B. für statistische Zwecke speichern. Soweit dies uns bekannt ist, klären wir die Nutzer darüber auf.</Text>

                <Text style={styles.heading}>Amazon-Partnerprogramm</Text>
                <Text style={styles.paragraph}>Der Postillon ist Teilnehmer des Partnerprogramms von Amazon Europe S.à.r.l. und Partner des Werbeprogramms, das zur Bereitstellung eines Mediums für Websites konzipiert wurde, mittels dessen durch die Platzierung von Werbeanzeigen und Links zu amazon.de Werbekostenerstattung verdient werden können. Amazon setzt Cookies ein, um die Herkunft der Bestellungen nachvollziehen zu können. Unter anderem kann Amazon erkennen, dass Sie den Partnerlink auf dieser Website geklickt haben. Weitere Informationen zur Datennutzung durch Amazon erhalten Sie in der Datenschutzerklärung des Unternehmens: http://www.amazon.de/gp/help/customer/display.html/ref=footer_privacy?ie=UTF8&nodeId=3312401</Text>

                <Text style={styles.heading}>Verwendung von Steady</Text>
                <Text style={styles.paragraph}>Wir verwenden Dienste der Fa. Steady Media UG (haftungsbeschränkt), Schönhauser Allee 36, 10435 Berlin („Steady“). Steady verkauft Abonnements / Mitgliedschaften unserer Publikation, rechnet diese ab und erbringt entsprechende Leistungen, zum Beispiel über die Bereitstellung einer Paywall auf unserer Seite. Steady sammelt und speichert zu diesem Zweck u.a. mögliche Identifizierungsdaten (u.a. IP-Adresse, Datum, Zeit und weitere technische Daten über den genutzten Internet-Browser und das genutzte Betriebssystem) und überprüft, ob ein Nutzer Abonnement / Mitglied ist. Hierfür setzt Steady Cookies auf unserer Website ein. Von Abonnenten erhebt Steady zudem weitere Daten, wie E-Mail-Adresse, Name und Daten zum Abonnement. Die vollständigen Datenschutzhinweise der Fa. Steady können hier abgerufen werden: https://steadyhq.com/de/privacy</Text>

                <Text style={styles.heading}>Whatsapp Benachrichtigungen</Text>
                <Text style={styles.paragraph}>Nutzer haben die Möglichkeit, sich über den Messengerdienst Whatsapp per Nachricht über aktuelle Meldungen auf unserer Seite informieren zu lassen. Dieses Angebot benutzt dazu den Messenger-Service MessengerPeople GmbH Herzog-Heinrich-Str. 9 80336 München (vormals "WhatsBroadcast"), der Kunden- und Endnutzerdaten zum Zweck der Erbringung der Messenger-Services nutzt und speichert. Dies beinhaltet die bei der Messenger-Plattform hinterlegten Benutzerdaten (ggf. Name, Vorname, Profilbild und andere Profildaten), Ihre Telefonnummer, ihre Chathistorie mit dem Messengerdienst MessengerPeople und davon abgeleitete Daten.</Text>
                <Text style={styles.paragraph}>Sie haben jederzeit die Möglichkeit, den Whatsapp-Benachrichtigungs-Service mit einer individuellen Nachricht zu beenden. Dafür senden Sie im Messenger „STOP“ an den Anbieter. Sie erhalten bis zu einer neuen Anmeldung keine weiteren Nachrichten vom Anbieter.</Text>
                <Text style={styles.paragraph}>Um alle von Ihnen gespeicherten Kundendaten entfernen zu lassen, senden Sie eine Nachricht mit dem Text „ALLE DATEN LOESCHEN“ über Ihren Messenger.</Text>
                <Text style={styles.paragraph}>Weitere Informationen hierzu finden sich in der Datenschutzerklärung von Messenger People unter https://www.messengerpeople.com/de/datenschutzerklaerung/</Text>

                <Text style={styles.heading}>Verwendung von Geräteidentifikationsmerkmalen bei Apps</Text>
                <Text style={styles.paragraph}>Wir verwenden innerhalb unserer Apps unterschiedliche Methoden zur Geräteidentifikation (z.B. zur Bereitstellung von Funktionen, zur Fehlerauswertung und für statistische Reporting-Zwecke) und zur Ausspielung von nutzerspezifischen Informationen. Wir tun dies insbesondere, um „Push Mitteilungen“ im Rahmen der Funktionen der Apps anzubieten, und zur gezielten Aussteuerung von Werbung innerhalb von Applikationen sowie übergreifend über die von uns angebotenen Applikation. Letzteres ist insbesondere im Rahmen des „Frequency Cappings“ relevant, über das sichergestellt wird, dass Werbung nur in einer bestimmten Häufigkeit für den Nutzer ausgespielt wird.</Text>
                <Text style={styles.paragraph}>Für diese Werbeaussteuerung nutzen wir bei Android Apps die sog. "Google Werbe ID" gemäß den Vorgaben von Google, die Sie z.B. hier einsehen können: https://play.google.com/intl/de/about/developer-content-policy/. Bei iOS (Apple) Geräten verwenden wir den von Apple vorgesehenen "Advertising Identifier".</Text>
                <Text style={styles.paragraph}>Durch Nutzung dieser IDs ist für uns kein Rückschluss auf Ihre Person möglich.</Text>
                <Text style={styles.paragraph}>Die IDs werden auf Ihrem Gerät unter Einhaltung der Richtlinien und Vorgaben der Betriebssystemanbieter erstellt. Wir beachten ferner Ihre getroffenen Einstellungen zur nutzerspezifischen Werbung. Die Ausspielung von Push-Mitteilungen erfolgt über sogenannte "Device Tokens", einer von Apple bzw. Google (bei Android Apps) beim App-Start generierten ID.</Text>

                <Text style={styles.heading}>Google Analytics</Text>
                <Text style={styles.paragraph}>Google Analytics verwendet sog. „Cookies“, Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung des Angebots durch Sie ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser App werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Im Falle der Aktivierung der IP-Anonymisierung auf dieser Webseite, wird Ihre IP-Adresse von Google jedoch innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt. Im Auftrag des Betreibers dieser App wird Google diese Informationen benutzen, um Ihre Nutzung der App auszuwerten, um Reports über die Appaktivitäten zusammenzustellen und um weitere mit der Appnutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem Appbetreiber zu erbringen. Die im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt. Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Software verhindern; wir weisen Sie jedoch darauf hin, dass in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser App vollumfänglich werden nutzen können.</Text>
                <Text style={styles.paragraph}>Innerhalb dieser App ist die IP-Anonymisierung aktiviert.</Text>
                <Text style={styles.paragraph}>Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten und auf Ihre Nutzung der App bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem Sie diese über den angebotenen Schalter am Seitenanfang deaktivieren.</Text>

                <Text style={styles.heading}>Google Firebase</Text>
                <Text style={styles.paragraph}>Ferner nutzen wir den Service Google Firebase zur Analyse und Kategorisierung von Nutzergruppen sowie zur Ausspielung von Push-Mitteilungen nutzen wir den Dienst „Google-Firebase“. Nähere Informationen hierzu sowie zum Datenschutz bei Google-Produkten finden Sie unter https://firebase.google.com/ und https://www.google.com/policies/privacy/</Text>

                <Text style={styles.heading}>Deaktivierung</Text>
                <Text style={styles.paragraph}>Sofern Sie die Messung über Google-Analytics (s.o.) deaktiviert haben, ist hierüber auch die Messung über Universal Analytics sowie Firebase deaktiviert, jedoch nur auf diesem Gerät, nicht auch auf anderen Geräten, die Sie ggf. benutzen. Push-Mitteilungen können Sie in den Einstellungen der App über den Punkt "Benachrichtigungen" sowie über die Systemeinstellungen Ihres Gerätes deaktivieren.</Text>
            </View>
        );
    };

    render() {
        const { analytics, styles, locale } = this.props;

        return (
            <ScrollView style={styles.container}>
                <View style={styles.line}>
                    <CheckBox value={analytics} onValueChange={this.handleAnalyticsCheckboxChanged} />
                    <Text style={styles.linetext}>Firebase Analytics</Text>
                </View>

                { (this[locale] && this[locale]()) || this.de() }
            </ScrollView>
        );
    }

}

export default PrivacyPolicyScreen;