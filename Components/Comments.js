import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import axios from 'axios';

export default class CommentsScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: '',
            pid: this.props.navigation.state.params.pid,
            user1: '',
            comment: '',
            flag: false
        }
    }
    componentDidMount() {
        axios.get('https://panorbit.in/api/comments.json')
            .then(result => {
                this.setState({ comments: result.data.comments })
            })
        axios.get('https://panorbit.in/api/users.json')
            .then(resp => {
                this.setState({ user1: resp.data.users[0] })
            })
    }

    comment = () => {
        if (this.state.comments) {
            return (
                <View>
                    {
                        this.state.comments.map((item, index) => {
                            if (item.postId == this.state.pid) {
                                return (
                                    <View key={index} style={{ marginTop: 20, flexDirection: 'row' }}>
                                        <Image
                                            style={{ marginLeft: 5, height: 30, width: 30, borderRadius: 20 }} source={{ uri: item.profilePicture }} />
                                        <Text style={{ marginLeft: 8 }}>{item.body}</Text>
                                    </View>)
                            }
                        })
                    }
                </View>
            )
        }
        if (this.state.flag ) {
            console.warn("check")
            return (
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ marginLeft: 5, height: 30, width: 30, borderRadius: 20 }} source={{ uri: "https://panorbit.in/wp-content/uploads/2019/hotlink-ok/1001.jpeg" }} />
                    <Text style={{ marginLeft: 8 }}>{this.state.comment}</Text>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Posts')}>
                        <Image style={{ margin: 10 }} source={require('./../assets/back.png')} />
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 15, marginTop: 3, fontSize: 20 }}>Comments</Text>
                </View>
                <ScrollView style={{ marginLeft: 10 }}>
                    {this.comment()}
                </ScrollView>
                <View style={{ justifyContent: 'flex-end', marginBottom: 6, borderTopWidth: 0.5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ height: 30, width: 30, borderRadius: 20, marginLeft: 15, marginTop: 5 }} source={{ uri: this.state.user1.profilepicture }} />
                        <TextInput style={{ width: '80%', marginLeft: 5 }} placeholder='Add a Comment'
                            onChangeText={(text) => this.setState({ comment: text })}></TextInput>
                        <TouchableOpacity onPress={() => this.setState({ flag:true })}><Text style={{ marginTop: 15 }}>Post</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
