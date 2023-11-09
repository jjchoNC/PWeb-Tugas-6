import { CollectionConfig } from 'payload/types'

const Mahasiswa: CollectionConfig = {
  slug: 'Mahasiswa',
  auth: {
    disableLocalStrategy: true
  },
  admin: {
    useAsTitle: 'nama',
  },
  fields: [
    {
      name: 'nama',
      type: 'text',
      label: 'Nama',
      required: true
    },
    {
      name: 'ipk',
      type: 'number',
      label: 'IPK',
      required: true
    }
  ],
}

export default Mahasiswa
