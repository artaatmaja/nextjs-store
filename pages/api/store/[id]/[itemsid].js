import dbConnect from '../../../../utils/dbConnect';
import Store from '../../../../models/Store';

dbConnect();

export default async (req, res) => {
    const {
        query: { id, itemsid },
        method
    } = req;

    switch(method) {
        case 'GET':
            try {
                const store = await Store.findById(id);
                const selectedItem = store.items.filter((item) => item.id === itemsid)

                if (!selectedItem) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: selectedItem });
            } catch (error) {
                return res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const store = await Store.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!store) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: store });
            } catch (error) {
                return res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deletedStore = await Store.update({}, {$pull:{items: {_id: itemsid}}}, { multi: true } );
                
                if(!deletedStore) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}