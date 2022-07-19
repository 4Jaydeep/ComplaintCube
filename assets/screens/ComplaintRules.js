import { Text, StyleSheet, View, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native'
import React, { Component } from 'react'
const { height } = Dimensions.get('screen');
const { width } = Dimensions.get('screen');
export default class ComplaintRules extends Component {
    render() {
        return (
            <View style={styles.contai}>

                <View style={styles.Header} >
                    <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'center' }} onPress={() => { this.props.navigation.navigate('AddComplaint'); }}>
                        <Image source={require('../imgs/icons/backmain.png')} style={{ width: 30, height: 30, }} />
                    </TouchableOpacity>
                    <Text style={{ color: '#000', fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', fontSize: 20, right: 10 }}>Complaints Rules</Text>
                    <View></View>
                </View>
                <ScrollView>

                    <>
                        <View style={styles.TextView}>
                            {/* <Text style={styles.HeaderText}>Read Our Rules Properly</Text> */}

                            <View>
                                <Text style={styles.HeaderText}>
                                    1.1 Objectionable Content
                                </Text>

                                <Text style={styles.MainContent}>           Apps should not include content that is offensive, insensitive, upsetting, intended to disgust, in exceptionally poor taste, or just plain creepy. Examples of such content include:</Text>
                            </View>


                            <View style={{ top: 10 }}>
                                <Text style={styles.MainContent}>   <Text style={{ fontWeight: 'bold', color: '#000' }}>1.1.1</Text>    Defamatory, discriminatory, or mean-spirited content, including references or commentary about religion, race, sexual orientation, gender, national/ethnic origin, or other targeted groups, particularly if the app is likely to humiliate, intimidate, or harm a targeted individual or group. Professional political satirists and humorists are generally exempt from this requirement.</Text>
                            </View>

                            <View style={{ top: 20 }}>
                                <Text style={styles.MainContent}>   <Text style={{ fontWeight: 'bold', color: '#000' }}>1.1.2</Text>    Realistic portrayals of people or animals being killed, maimed, tortured, or abused, or content that encourages violence. “Enemies” within the context of a game cannot solely target a specific race, culture, real government, corporation, or any other real entity.</Text>
                            </View>

                            <View style={{ top: 30 }}>
                                <Text style={styles.MainContent}>   <Text style={{ fontWeight: 'bold', color: '#000' }}>1.1.3</Text>    Depictions that encourage illegal or reckless use of weapons and dangerous objects, or facilitate the purchase of firearms or ammunition.</Text>
                            </View>

                            <View style={{ top: 40 }}>
                                <Text style={styles.MainContent}>   <Text style={{ fontWeight: 'bold', color: '#000' }}>1.1.4</Text>    Overtly sexual or pornographic material, defined by Webster’s Dictionary as “explicit descriptions or displays of sexual organs or activities intended to stimulate erotic rather than aesthetic or emotional feelings.” This includes “hookup” apps that may include pornography or be used to facilitate prostitution.</Text>
                            </View>

                            <View style={{ top: 50 }}>
                                <Text style={styles.MainContent}>   <Text style={{ fontWeight: 'bold', color: '#000' }}>1.1.5</Text>    Inflammatory religious commentary or inaccurate or misleading quotations of religious texts.</Text>
                            </View>

                            <View style={{ top: 60 }}>
                                <Text style={styles.MainContent}>   <Text style={{ fontWeight: 'bold', color: '#000' }}>1.1.6</Text>    False information and features, including inaccurate device data or trick/joke functionality, such as fake location trackers. Stating that the app is “for entertainment purposes” won’t overcome this guideline. Apps that enable anonymous or prank phone calls or SMS/MMS messaging will be rejected.</Text>
                            </View>
                        </View>
                    </>

                    <>
                        {/* <View style={styles.TextView2}>

                            <View>
                                <Text style={styles.HeaderText}>
                                    1.2 User-Generated Content
                                </Text>

                                <Text style={styles.MainContent}>           Apps with user-generated content present particular challenges, ranging from intellectual property infringement to anonymous bullying. To prevent abuse, apps with user-generated content or social networking services must include:</Text>
                            </View>

                            <Text style={styles.MainContent}>               A method for filtering objectionable material from being posted to the app A mechanism to report offensive content and timely responses to concerns The ability to block abusive users from the service Published contact information so users can easily reach you Apps with user-generated content or services that end up being used primarily for pornographic content, Chatroulette-style experiences, objectification of real people (e.g. “hot-or-not” voting), making physical threats, or bullying do not belong on the App Store and may be removed without notice. If your app includes user-generated content from a web-based service, it may display incidental mature “NSFW” content, provided that the content is hidden by default and only displayed when the user turns it on via your website.</Text>


                            <View style={{ top: 10, height: height }}>
                                <Text style={styles.HeaderText}>
                                    1.2.1 Creator Content
                                </Text>

                                <Text style={styles.MainContent}>           Apps which feature content from a specific community of users called “creators” are a great opportunity if properly moderated. These apps present a singular, unified experience for customers to interact with various kinds of creator content. They offer tools and programs to help this community of non-developer creators to author, share, and monetize user-generated experiences. These experiences must not change the core features and functionality of the native app—rather, they add content to those structured experiences. These experiences are not native “apps” coded by developers—they are content within the app itself and are treated as user-generated content by App Review. Such creator content may include video, articles, audio, and even casual games. The App Store supports apps offering such user-generated content so long as they follow all Guidelines, including Guideline 1.2 for moderating user-generated content and Guideline 3.1.1 for payments and in-app purchases. Creator apps should share the age rating of the highest age-rated creator content available in the app, and communicate to users which content requires additional purchases.</Text>
                            </View>

                            

                        </View> */}

                        <View style={styles.TextView1}>
                            {/* <Text style={styles.HeaderText}>Read Our Rules Properly</Text> */}

                            <View>
                                <Text style={styles.HeaderText}>
                                    1.1 Objectionable Content
                                </Text>

                                <Text style={styles.MainContent}>           Apps should not include content that is offensive, insensitive, upsetting, intended to disgust, in exceptionally poor taste, or just plain creepy. Examples of such content include:</Text>
                            </View>


                            <View style={{ top: 10 }}>
                                <Text style={styles.MainContent}>   <Text style={{ fontWeight: 'bold', color: '#000' }}>1.1.1</Text>    Defamatory, discriminatory, or mean-spirited content, including references or commentary about religion, race, sexual orientation, gender, national/ethnic origin, or other targeted groups, particularly if the app is likely to humiliate, intimidate, or harm a targeted individual or group. Professional political satirists and humorists are generally exempt from this requirement.</Text>
                            </View>

                            <View style={{ top: 20 }}>
                                <Text style={styles.MainContent}>   <Text style={{ fontWeight: 'bold', color: '#000' }}>1.1.2</Text>    Realistic portrayals of people or animals being killed, maimed, tortured, or abused, or content that encourages violence. “Enemies” within the context of a game cannot solely target a specific race, culture, real government, corporation, or any other real entity.</Text>
                            </View>

                            <View style={{ top: 30 }}>
                                <Text style={styles.MainContent}>   <Text style={{ fontWeight: 'bold', color: '#000' }}>1.1.3</Text>    Depictions that encourage illegal or reckless use of weapons and dangerous objects, or facilitate the purchase of firearms or ammunition.</Text>
                            </View>

                            <View style={{ top: 40 }}>
                                <Text style={styles.MainContent}>   <Text style={{ fontWeight: 'bold', color: '#000' }}>1.1.4</Text>    Overtly sexual or pornographic material, defined by Webster’s Dictionary as “explicit descriptions or displays of sexual organs or activities intended to stimulate erotic rather than aesthetic or emotional feelings.” This includes “hookup” apps that may include pornography or be used to facilitate prostitution.</Text>
                            </View>

                            <View style={{ top: 50 }}>
                                <Text style={styles.MainContent}>   <Text style={{ fontWeight: 'bold', color: '#000' }}>1.1.5</Text>    Inflammatory religious commentary or inaccurate or misleading quotations of religious texts.</Text>
                            </View>

                            <View style={{ top: 60 }}>
                                <Text style={styles.MainContent}>   <Text style={{ fontWeight: 'bold', color: '#000' }}>1.1.6</Text>    False information and features, including inaccurate device data or trick/joke functionality, such as fake location trackers. Stating that the app is “for entertainment purposes” won’t overcome this guideline. Apps that enable anonymous or prank phone calls or SMS/MMS messaging will be rejected.</Text>
                            </View>
                        </View>
                    </>

                    <Text>Go Back To AddComplaint Page <Text>Click Here</Text></Text>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contai: {


        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    Header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    TextView: {
        height: height - 100,
    },
    TextView1: {
        top: - 200
    },
    HeaderText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000',
        padding: 20
    },
    MainContent: {
        paddingLeft: 20,
        paddingRight: 20,
        color: '#000',
        textAlign: 'justify',
        alignSelf: 'center',
        justifyContent: 'center',
    }
})