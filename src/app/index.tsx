import { Update } from '@/services/AuthService'
import { useAuth } from '@clerk/expo'
import { AuthView } from '@clerk/expo/native'
import { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'


  

export default function MainScreen() {
  const { isSignedIn, isLoaded } = useAuth({ treatPendingAsSignedOut: false })
  const [mobile, setMobile] = useState('')
  const [name, setName] = useState('')
  const [batch, setBatch] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  if (!isLoaded) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (!isSignedIn) {
    return <AuthView mode="signInOrUp" />
  }
 
  const isFormValid = name.trim().length > 0 && mobile.trim().length > 0 && batch.trim().length > 0

  const handleUpdateUser = async () => {
    if (!isFormValid || isSaving) {
      return
    }

    setIsSaving(true)
    try {
      await Update({ mobile, name, batch })
    } catch (error) {
      console.error('Error updating user:', error)
    } finally {
      setIsSaving(false)
    }
  }



   
   

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Complete Profile</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Your name"
          autoCapitalize="words"
          returnKeyType="next"
        />
        <Text style={styles.label}>Mobile</Text>
        <TextInput
          style={styles.input}
          value={mobile}
          onChangeText={setMobile}
          placeholder="Mobile number"
          keyboardType="phone-pad"
          returnKeyType="next"
        />
        <Text style={styles.label}>Batch</Text>
        <TextInput
          style={styles.input}
          value={batch}
          onChangeText={setBatch}
          placeholder="Batch"
          autoCapitalize="characters"
          returnKeyType="done"
        />
        <TouchableOpacity
          style={[styles.linkButton, (!isFormValid || isSaving) && styles.linkButtonDisabled]}
          onPress={handleUpdateUser}
          disabled={!isFormValid || isSaving}
        >
          <Text style={styles.linkButtonText}>{isSaving ? 'Saving...' : 'Save'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  form: {
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  linkButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  linkButtonDisabled: {
    opacity: 0.6,
  },
  linkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})