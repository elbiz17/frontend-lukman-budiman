import InputArea from '@/components/molecules/InputArea'
import InputLabel from '@/components/molecules/InputLabel'
import SelectLabel from '@/components/molecules/SelectLabel'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toIDR } from '@/lib/utils'
import { getCountries, getHarbours, getItems } from '@/store/datasHarbourSlice/datasHarbourSlice'
import { type AppDispatch, type AppState } from '@/store/store'
import { Anchor,  Box, Calculator, DollarSign, MapPin, Percent } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const { countries, harbours, items } = useSelector((states: AppState) => states.datasHarbour)
  const [country, setCountry] = useState("")
  const [harbour, setHarbour] = useState("")
  const [selectedItem, setSelecteditem] = useState("")
  const [data, setData] = useState({
    discount: "",
    price: "",
    description: ""
  })

  useEffect(() => {
    dispatch(getCountries({ forceFetch: true }))
  }, [dispatch])


  useEffect(() => {
    if (country) {
      dispatch(getHarbours({
        forceFetch: true,
        props: { where: { id_negara: country } }
      }))
      setHarbour("")
      setSelecteditem("")
      setData({
        ...data,
        discount: "",
        price: "",
        description: ""
      })
    }
  }, [country, dispatch])


  useEffect(() => {
    if (harbour) {
      dispatch(getItems({
        forceFetch: true,
        props: { where: { id_pelabuhan: harbour } }
      }))
      setSelecteditem("")
      // setDiscount("")
      // setPrice("")
      setData({
        ...data,
        discount: "",
        price: "",
        description: ""
      })
    }
  }, [harbour, dispatch])

  const handleItemChange = (itemId: string) => {
    setSelecteditem(itemId)
    if (itemId) {
      const item = items.data.find((item) => item.id_barang.toString() == itemId)
      if (item) {
        setData({
          ...data,
          discount: item.diskon.toString(),
          price: item.harga.toString(),
          description: item.description
        })
      } else {
        setData({
          ...data,
          discount: "",
          price: "",
          description: ""
        })
      }
    }
  }
  
  const discAmount = (Number(data.price) * (Number(data.discount) / 100));
  const total = data.price && data.discount ? 
  Number(data.price) -  (Number(data.price) * (Number(data.discount) / 100)) : 0;

  return (
    <div className='min-h-[calc(100vh-200px)] '>
      <div className='grid md:grid-cols-5 gap-5 px-8 md:px-0'>
        <Card className='md:col-span-3 rounded-sm shadow-none'>
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl font-bold text-blue-500'>Form Pemesanan Produk</CardTitle>
            <CardDescription>Lengkapi informasi produk dan pengiriman Anda</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <h3 className='mb-2 font-medium text-blue-500'>Informasi Lokasi</h3>
              <div className='grid md:grid-cols-2 gap-3'>
                <SelectLabel
                  reverse
                  icon={<MapPin size={14} />}
                  label='Negara'
                  value={country}
                  errors=''
                  onChange={(e: any) => {
                    setCountry(e)
                  }}
                  options={countries?.data?.map((country) => ({
                    label: country.nama_negara,
                    value: country.id_negara,
                    description: country.kode_negara
                  }))}
                />
                <SelectLabel
                  icon={<Anchor size={14} />}
                  label='Pelabuhan'
                  value={harbour}
                  errors=''
                  onChange={(e) => {
                    setHarbour(e)
                  }}
                  options={harbours.data.map((harbour) => ({
                    label: harbour.nama_pelabuhan,
                    value: harbour.id_pelabuhan
                  }))}
                />
              </div>
            </div>
            <div>
              <h3 className='mb-2 font-medium text-blue-500'>Informasi Produk</h3>
              <div className='w-full space-y-4'>
                <SelectLabel
                  reverse
                  icon={<Box size={14} />}
                  label='Jenis Barang'
                  value={selectedItem}
                  errors=''
                  onChange={handleItemChange}
                  options={items.data.map((item) => ({
                    label: item.nama_barang,
                    value: item.id_barang,
                    description: `${item.id_barang}`
                  }))}
                />
                <InputArea
                  label='Deskripsi Produk'
                  value={data?.description}
                  readonly
                  onChange={() => { }}
                />
              </div>
            </div>

            <div>
              <h3 className='mb-2 font-medium text-blue-500'>Informasi Harga</h3>
              <div className='grid md:grid-cols-2 gap-3 space-y-3'>
                <InputLabel
                  icon={<Percent size={14} />}
                  label='Discount'
                  value={data?.discount}
                  readonly
                  onChange={() => {}}
                />
                <InputLabel
                  icon={<DollarSign size={14} />}
                  label='Harga'
                  value={data.price && toIDR(data.price)}
                  readonly
                  onChange={() => { }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className='md:col-span-2 rounded-sm shadow-none'>
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl font-bold text-blue-500'>Ringkasan Perhitungan</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className="bg-gradient-to-r from-sky-50 to-blue-50 p-6 rounded-xl border border-sky-100">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Ringkasan Perhitungan</h3>
              </div>

              <div className="space-y-3">

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Harga per unit:</span>
                  <span className="font-mono text-gray-800">{toIDR((data.price) || 0)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-mono text-gray-800">{toIDR(data.price)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Diskon ({data.discount}%):</span>
                  <span className="font-mono text-red-600">{toIDR(discAmount)}</span>
                </div>

                {/* <Separator /> */}

                <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-600 p-4 rounded-lg text-white">
                  <span className="text-xl font-bold">Total:</span>
                  <span className="text-2xl font-bold font-mono">{toIDR(total)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
