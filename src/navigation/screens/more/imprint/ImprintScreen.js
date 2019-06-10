import React, { PureComponent } from 'react';
import ReactNative, { ScrollView, View, Text } from 'react-native';
import merge from 'deepmerge';

import { ThemeManager } from '@postillon/react-native-theme';
import { Themes } from '../../../../constants/themes';


export class ImprintScreen extends PureComponent {

    static options(passProps) {
        const { theme = Themes.DEFAULT } = passProps;
        const { defaults: screenStyle } = ThemeManager.getStyleSheetForComponent('screens', theme);

        return merge(screenStyle, {
            topBar: {
                visible: true,
                drawBehind: false,
                hideOnScroll: false,
            },
        });
    }

    constructor(props, context) {
        super(props, context);
    }

    en = () => {
        const { styles } = this.props;

        return (
            <View style={styles.content}>
                <Text style={styles.heading}>This app is managed and maintained by:</Text>
                <Text style={styles.paragraph}>{'Steckenpferd Enterprises UG (haftungsbeschränkt)\nTheresienstraße 5\n90763 Fürth'}</Text>

                <Text style={styles.heading}>Contact:</Text>
                <Text style={styles.paragraph}>redaktion@der-postillon.com</Text>

                <Text style={styles.heading}>Responsible for content in accordance with § 55 Abs. 2 RStV:</Text>
                <Text style={styles.paragraph}>{'Stefan Sichermann'}</Text>

                <Text style={styles.heading}>Editorial staff:</Text>
                <Text style={styles.paragraph}>Alexander Bayer, Dan Eckert, Stefan Sichermann</Text>
            </View>
        );
    };

    de = () => {
        const { styles } = this.props;

        return (
            <View style={styles.content}>
                <Text style={styles.heading}>Angaben gemäß § 5 TMG:</Text>
                <Text style={styles.paragraph}>{'Geschäftsführer: Stefan Sichermann\nSteckenpferd Enterprises UG (haftungsbeschränkt)\nTheresienstraße 5\n90763 Fürth'}</Text>

                <Text style={styles.heading}>Kontakt:</Text>
                <Text style={styles.paragraph}>redaktion@der-postillon.com</Text>

                <Text style={styles.heading}>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</Text>
                <Text style={styles.paragraph}>{'Stefan Sichermann\nTheresienstraße 5\n90763 Fürth'}</Text>

                <Text style={styles.heading}>Redaktion:</Text>
                <Text style={styles.paragraph}>Alexander Bayer, Dan Eckert, Stefan Sichermann</Text>

                <Text style={styles.heading}>Redaktionsassistenz:</Text>
                <Text style={styles.paragraph}>Jennifer Schetter</Text>

                <Text style={styles.heading}>Freie Mitarbeiter:</Text>
                <Text style={styles.paragraph}>Philipp Feldhusen, Peer Gahmert, Ernst Jordan, David Nießen, Sebastian Wolking, Simon Hauschild, Daniel Al-Kabbani, Bernhard Pöschla</Text>

                <Text style={styles.heading}>Rechtsberatung:</Text>
                <Text style={styles.paragraph}>Rechtsanwalt Lutz Heidelberg, Rechtsanwalt Christoph Span</Text>

                <Text style={styles.heading}>Anzeigenverwaltung:</Text>
                <Text style={styles.paragraph}>{'VICE MEDIA GmbH\nRungestr. 22 – 24\n10179 Berlin\nbenny.eichelmann@vice.com'}</Text>

                <Text style={styles.heading}>Haftungsausschluss:</Text>
                <Text style={styles.paragraph}>
                    <Text style={[styles.text, styles.bold]}>Haftung für Inhalte{'\n'}</Text>
                    <Text style={styles.text}>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</Text>
                </Text>

                <Text style={styles.paragraph}>Bevor Sie uns verklagen, würden wir uns über einen Hinweis per E-Mail freuen.</Text>

                <Text style={styles.paragraph}>Die Kostennote einer anwaltlichen Abmahnung ohne vorhergehende Kontaktaufnahme wird im Sinne der Schadensminderungspflicht als unbegründet zurückgewiesen. Unberechtigte Abmahnungen und / oder Unterlassungserklärungen werden direkt mit einer negativen Feststellungsklage oder Schlimmerem beantwortet.</Text>

                <Text style={styles.paragraph}>
                    <Text style={[styles.text, styles.bold]}>Haftung für Links{'\n'}</Text>
                    <Text style={styles.text}>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</Text>
                </Text>

                <Text style={styles.paragraph}>
                    <Text style={[styles.text, styles.bold]}>Urheberrecht{'\n'}</Text>
                    <Text style={styles.text}>Alle Artikel im Postillon stehen unter einer Creative-Commons-Lizenz (nicht für den kommerziellen Gebrauch) und können unter Verlinkung und/oder Hinweis auf die Originalquelle verwendet werden. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</Text>
                </Text>

                <Text style={[styles.paragraph, styles.italic]}>Quelle: Disclaimer von eRecht24, dem Portal zum Internetrecht von Rechtsanwalt Sören Siebert.</Text>
            </View>
        );
    };

    render() {
        const { locale, styles } = this.props;

        return (
            <ScrollView style={styles.container}>
                { (this[locale] && this[locale]()) || this.de() }
            </ScrollView>
        );
    }

}

export default ImprintScreen;