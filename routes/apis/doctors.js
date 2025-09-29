const express=require('express');
const router=express.Router();
const doctorsController=require('../../controllers/doctorsController');

router.get('/:userId',doctorsController.getDoctors);
router.put('/',doctorsController.updateDoctor);
router.post('/',doctorsController.addDoctor);
router.delete('/:doctorId',doctorsController.deleteDoctor);
router.post('/deleteDoctors',doctorsController.deleteDoctors)

module.exports=router;