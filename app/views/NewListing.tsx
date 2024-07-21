import FormInput from "@app/ui/Forminput";
import { FC, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import colors from "@utils/colors";
import DatePicker from "@app/ui/DatePicker";
import OptionModal from "@components/OptionModal";
import categories from "@utils/categories";
import CategoryOption from "@app/ui/CategoryOption";
import { AntDesign } from '@expo/vector-icons';
import AppButton from "@app/ui/AppButton";
import CustomKeyAvoidingView from "@app/ui/CustomKeyView";
import * as ImagePicker from 'expo-image-picker'
import { showMessage } from "react-native-flash-message";
import HorizontalImageList from "@components/HorizontalImageList";
import { newProductSchema, yupValidate } from "@utils/validator";
import mime from "mime";
import useClient from "@hooks/useClient";
import auth from "@store/auth";
import { runAxiosAsync } from "@app/api/runAxiosAsync";
import LoadingSpinner from "@app/ui/LoadingSpinner";
import OptionSelector from "./OptionSelector";
import { selectImages } from "@utils/helpers";
import CategoryOptions from "@components/CategoryOptions";

interface Props { }

const defaultInfo = {
    name: "",
    description: "",
    category: "",
    price: '',
    purchasingDate: new Date(),
}

const imageOption = [{ value: "Remove Image", id: 'remove' }]

const NewListing: FC<Props> = (props) => {
    const [productInfo, setProductInfo] = useState({ ...defaultInfo })
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [busy, setBusy] = useState(false)
    const [showImageOptions, setShowImageOptions] = useState(false)
    const [images, setImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState('')
    const {authClient} = useClient()
    const { category, description, name, price, purchasingDate } = productInfo;

    const handleChange = (name: string) => (text: string) => {
        setProductInfo({ ...productInfo, [name]: text })
    };

    const handleSubmit = async () => {
        // console.log(productInfo);
        const { error } = await yupValidate(newProductSchema, productInfo)
        if (error) return showMessage({ message: error, type: 'danger' })
        console.log(productInfo);

        // submit this form
        setBusy(true)
       const formData = new FormData();
       type productInfoKeys = keyof typeof productInfo; 

       for (let key in productInfo) {
        const value = productInfo[key as productInfoKeys];

        if(value instanceof Date) {
            formData.append(key, value.toISOString());
        }else {
            formData.append(key, value);
        }
       }

    //    appending images

    const newImages = images.map((img, index) => ({
        name: 'image_'+ index,
        type: mime.getType(img),
        uri: img
    }))

for(let img of newImages) {
    formData.append('images', img as any);
}

const res = await runAxiosAsync<{message: string}>(
    authClient.post('/product/list', formData,{
    headers: {
        'Content-Type': 'multipart/form-data',
    }
}))
setBusy(false)

if(res) {
    showMessage({ message: res.message, type: "success" });
    setProductInfo({...defaultInfo})
    setImages([]);
}

console.log(res);


    };

    // const handleOnImageSelection = async () => {
    //     const newImages = await selectImages()
    //     setImages([...images, ...newImages])
    // };

    const handleOnImageSelection = async () => {
        const newImages = await selectImages();
        if (newImages) {
            setImages([...images,...newImages]);
        }
    };

    return (
        <CustomKeyAvoidingView >
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Pressable onPress={handleOnImageSelection} style={styles.fileSelector}>
                        <View style={styles.iconContainer}>
                            <FontAwesome5 name="images" size={24} color="black" />
                        </View>
                        <Text style={styles.btnTitle}>Add Image</Text>
                    </Pressable>

                    <HorizontalImageList
                        images={images}
                        onLongPress={(img) => {
                            setSelectedImage(img)
                            setShowImageOptions(true);
                        }}
                    />

                    {/* <FlatList
                        data={images}
                        renderItem={({ item }) => {
                            return <Image style={styles.selectedImage}
                                source={{ uri: item }}
                            />
                        }}
                        keyExtractor={(item) => item}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    /> */}

                </View>

                <FormInput value={name} placeholder="Product Name"
                    onChangeText={handleChange('name')}
                />
                <FormInput value={price} placeholder="Price"
                    onChangeText={handleChange('price')}
                    keyboardType="numeric"
                />
                <DatePicker
                    title="Purchasing Date: "
                    value={purchasingDate}
                    onChange={(purchasingDate) =>
                        setProductInfo({ ...productInfo, purchasingDate })
                    }
                />

                <CategoryOptions 
                onSelect={handleChange("category")}
                 title={category || "Category"}
                 />
{/*                
                <OptionSelector 
                title={category || "Category"}
                onPress={() => setShowCategoryModal(true)}
                /> */}

                <FormInput
                    placeholder="Description"
                    multiline
                    numberOfLines={2}
                    value={description}
                    onChangeText={handleChange("description")}
                />

                <AppButton title="List Product" onPress={handleSubmit} />

                <OptionModal
                    visible={showImageOptions}
                    onRequestClose={setShowImageOptions}
                    options={imageOption}
                    renderItem={(item) => {
                        return <Text style={styles.imageOption}
                        >
                            {item.value}
                        </Text>
                    }}
                    onPress={(option) => {
                        if (option.id === "remove") {
                            const newImages = images.filter(img => img !== selectedImage)
                            setImages([...newImages])
                        }
                    }}
                />
            </View>
            <LoadingSpinner visible={busy}/>
        </CustomKeyAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        width: 70,
        height: 70,
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 7,
    },
    fileSelector: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
        alignSelf: "flex-start",
    },
    btnTitle: {
        color: colors.primary,
        marginTop: 5
    },
    categorySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15,
        padding: 8,
        borderWidth: 1,
        borderColor: colors.deActive,
        borderRadius: 5,
    },
    categoryTitle: {
        color: colors.primary,
    },
    selectedImage: {
        width: 70,
        height: 70,
        borderRadius: 7,
        marginLeft: 5,
    },
    imageContainer: {
        flexDirection: "row"
    },
    imageOption: {
        fontWeight: "600",
        fontSize: 18,
        color: colors.primary,
        padding: 10,
    },
});

export default NewListing; 