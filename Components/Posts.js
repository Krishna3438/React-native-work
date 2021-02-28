import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import axios from 'axios';

export default class PostsScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            response: '',
            user1: '',
            users: '',
            uid: 1,
            modalvisible: false,
        }
    }

    componentDidMount() {
        axios.get('https://panorbit.in/api/posts.json')
            .then(res => {
                this.setState({ response: res.data.posts })
            })
        axios.get('https://panorbit.in/api/users.json')
            .then(resp => {
                this.setState({ user1: resp.data.users[0], users: resp.data.users })
            })
    }

    title = () => {
        if (this.state.response) {
            return (
                <View>
                    {
                        this.state.response.map((item, index) => {
                            if (item.userId == this.state.uid) {
                                return (
                                    <View key={index} style={{ marginTop: 20 }}>
                                        <View style={{ flexDirection: 'row' , marginTop:5 }}>
                                            <Image style={{ height: 30, width: 30, borderRadius: 20 }} source={{ uri: this.state.user1.profilepicture }} />
                                            <Text style={{ marginTop:4 }}> by {this.state.user1.username}</Text>
                                        </View>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
                                        <Text style={{ marginTop: 5 }}>{item.time}</Text>
                                        <Image style={{ height: 180, marginRight: 10 }} source={{ uri: item.image }} />
                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                            <TouchableOpacity >
                                                <Image source={require('./../assets/like.png')} />
                                            </TouchableOpacity >
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments', { pid: item.id, uId: item.userId })}>
                                                <Image style={{ marginLeft: 20 }}
                                                    source={require('./../assets/comment.png')} />
                                            </TouchableOpacity>
                                            <Text style={{ marginLeft: 5 }}>1 comment</Text>
                                            <View style={{ flexDirection: 'row', marginLeft: 76 }}>
                                                <Text style={{ right: -20, marginTop: 5 }} onPress={() => this.props.navigation.navigate('Comments', { pid: item.id, uId: item.userId })}>Add a comment</Text>
                                                <Image style={{ height: 30, width: 30, right: -40, borderRadius: 20 }}
                                                    source={{ uri: this.state.user1.profilepicture }} />
                                            </View>
                                        </View>
                                    </View>)
                            }
                        })
                    }
                </View>
            )
        }
    }

    render() {
        return (
            <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <TouchableOpacity>
                        <Image
                            style={{ marginTop: 10, marginLeft: 10 }}
                            source={require('./../assets/hamburger.png')} />
                    </TouchableOpacity>
                    <Image
                        source={require('./../assets/logo.jpg')} />
                    <TouchableOpacity style={{ height: 30, width: 30, alignSelf: 'flex-end', right: -250, borderRadius: 20 }} onPress={() => this.setState({ modalvisible: true })}>
                        <Image style={{ height: 30, width: 30, borderRadius: 20 }} source={{ uri: this.state.user1.profilepicture }} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22 }}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={this.state.modalvisible}
                        >
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22 }}>
                                <View style={{
                                    margin: 20, backgroundColor: "white", borderRadius: 20, padding: 35, shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2
                                    }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5
                                }}>
                                    {
                                        this.state.users && this.state.users.map((item, index) => (
                                            <View key={index} style={{ flexDirection: 'row' }} >
                                                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this.setState({ modalvisible: false, uid: item.id, user1: item })}>
                                                    <Text style={{ marginLeft: 10, marginTop: 10 }}>{item.username}</Text>
                                                    <Image style={{ height: 30, width: 30, borderRadius: 20, right: -20 }}
                                                        source={{ uri: item.profilepicture }} />
                                                </TouchableOpacity>
                                            </View>
                                        ))
                                    }
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>
                <ScrollView style={{ marginLeft: 10 }}>
                    {this.title()}
                </ScrollView>
            </View>
        );
    }
}
