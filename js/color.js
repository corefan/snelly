
// sRGB color space XYZ -> RGB conversion 
function xyzToRgb(xyz)
{
	var x = xyz[0]; var y = xyz[1]; var z = xyz[2];
	var R =  3.2404542*x - 1.5371385*y - 0.4985314*z;
	var G = -0.9692660*x + 1.8760108*y + 0.0415560*z;
 	var B =  0.0556434*x - 0.2040259*y + 1.0572252*z;
 	return [R, G, B];
}

// sRGB color space RGB -> XYZ conversion 
function rgbToXyz(rgb)
{
	var r = rgb[0]; var g = rgb[1]; var b = rgb[2];
	var X = 0.4124564*r + 0.3575761*g + 0.1804375*b;
	var Y = 0.2126729*r + 0.7151522*g + 0.0721750*b;
 	var Z = 0.0193339*r + 0.1191920*g + 0.9503041*b;
 	return [X, Y, Z]
}

// A table of 1024 vec4 tristimulus XYZ values, corresponding to the 1024 wavelength samples
// between 390.0 and 750.0 nanometres
function wavelengthToXYZTable() {
    return new Float32Array([
    	0.003770, 0.000415, 0.018473, 0.0, 0.004023, 0.000444, 0.019711, 0.0, 0.004292, 0.000475, 0.021031, 0.0, 0.004579, 0.000508, 0.022441, 0.0, 
		0.004885, 0.000544, 0.023943, 0.0, 0.005212, 0.000581, 0.025545, 0.0, 0.005559, 0.000621, 0.027251, 0.0, 0.005929, 0.000664, 0.029069, 0.0, 
		0.006322, 0.000710, 0.031004, 0.0, 0.006741, 0.000758, 0.033065, 0.0, 0.007186, 0.000809, 0.035257, 0.0, 0.007659, 0.000863, 0.037588, 0.0, 
		0.008162, 0.000921, 0.040066, 0.0, 0.008695, 0.000981, 0.042699, 0.0, 0.009261, 0.001046, 0.045495, 0.0, 0.009861, 0.001114, 0.048463, 0.0, 
		0.010498, 0.001186, 0.051611, 0.0, 0.011172, 0.001262, 0.054949, 0.0, 0.011885, 0.001342, 0.058486, 0.0, 0.012640, 0.001426, 0.062230, 0.0, 
		0.013439, 0.001515, 0.066195, 0.0, 0.014282, 0.001608, 0.070385, 0.0, 0.015173, 0.001706, 0.074817, 0.0, 0.016113, 0.001808, 0.079494, 0.0, 
		0.017104, 0.001916, 0.084435, 0.0, 0.018148, 0.002029, 0.089640, 0.0, 0.019247, 0.002146, 0.095130, 0.0, 0.020403, 0.002269, 0.100906, 0.0, 
		0.021619, 0.002397, 0.106988, 0.0, 0.022895, 0.002531, 0.113376, 0.0, 0.024235, 0.002670, 0.120091, 0.0, 0.025639, 0.002814, 0.127133, 0.0, 
		0.027112, 0.002964, 0.134524, 0.0, 0.028653, 0.003120, 0.142266, 0.0, 0.030266, 0.003283, 0.150377, 0.0, 0.031952, 0.003451, 0.158860, 0.0, 
		0.033714, 0.003626, 0.167732, 0.0, 0.035553, 0.003808, 0.176998, 0.0, 0.037472, 0.003997, 0.186671, 0.0, 0.039472, 0.004194, 0.196758, 0.0, 
		0.041556, 0.004398, 0.207268, 0.0, 0.043723, 0.004610, 0.218210, 0.0, 0.045977, 0.004830, 0.229589, 0.0, 0.048319, 0.005059, 0.241415, 0.0, 
		0.050749, 0.005296, 0.253689, 0.0, 0.053269, 0.005543, 0.266420, 0.0, 0.055877, 0.005798, 0.279603, 0.0, 0.058574, 0.006063, 0.293248, 0.0, 
		0.061360, 0.006336, 0.307344, 0.0, 0.064234, 0.006617, 0.321901, 0.0, 0.067193, 0.006907, 0.336902, 0.0, 0.070238, 0.007205, 0.352355, 0.0, 
		0.073363, 0.007511, 0.368239, 0.0, 0.076570, 0.007823, 0.384559, 0.0, 0.079853, 0.008143, 0.401289, 0.0, 0.083210, 0.008469, 0.418429, 0.0, 
		0.086634, 0.008800, 0.435951, 0.0, 0.090124, 0.009136, 0.453848, 0.0, 0.093674, 0.009477, 0.472092, 0.0, 0.097282, 0.009821, 0.490683, 0.0, 
		0.100946, 0.010170, 0.509604, 0.0, 0.104664, 0.010522, 0.528852, 0.0, 0.108434, 0.010879, 0.548412, 0.0, 0.112255, 0.011239, 0.568278, 0.0, 
		0.116125, 0.011604, 0.588437, 0.0, 0.120042, 0.011972, 0.608882, 0.0, 0.124005, 0.012345, 0.629601, 0.0, 0.128011, 0.012722, 0.650585, 0.0, 
		0.132060, 0.013103, 0.671823, 0.0, 0.136149, 0.013490, 0.693305, 0.0, 0.140279, 0.013881, 0.715023, 0.0, 0.144447, 0.014277, 0.736964, 0.0, 
		0.148652, 0.014679, 0.759120, 0.0, 0.152887, 0.015086, 0.781454, 0.0, 0.157145, 0.015498, 0.803931, 0.0, 0.161416, 0.015915, 0.826508, 0.0, 
		0.165692, 0.016335, 0.849140, 0.0, 0.169964, 0.016758, 0.871782, 0.0, 0.174220, 0.017183, 0.894381, 0.0, 0.178451, 0.017610, 0.916888, 0.0, 
		0.182644, 0.018039, 0.939243, 0.0, 0.186790, 0.018467, 0.961397, 0.0, 0.190874, 0.018896, 0.983280, 0.0, 0.194885, 0.019323, 1.004841, 0.0, 
		0.198808, 0.019747, 1.026005, 0.0, 0.202633, 0.020169, 1.046720, 0.0, 0.206345, 0.020587, 1.066914, 0.0, 0.209945, 0.021000, 1.086591, 0.0, 
		0.213437, 0.021411, 1.105770, 0.0, 0.216830, 0.021818, 1.124492, 0.0, 0.220129, 0.022223, 1.142789, 0.0, 0.223346, 0.022627, 1.160708, 0.0, 
		0.226490, 0.023031, 1.178297, 0.0, 0.229571, 0.023434, 1.195607, 0.0, 0.232602, 0.023839, 1.212697, 0.0, 0.235595, 0.024246, 1.229627, 0.0, 
		0.238564, 0.024657, 1.246466, 0.0, 0.241523, 0.025072, 1.263282, 0.0, 0.244487, 0.025493, 1.280151, 0.0, 0.247473, 0.025922, 1.297152, 0.0, 
		0.250495, 0.026359, 1.314362, 0.0, 0.253559, 0.026805, 1.331805, 0.0, 0.256655, 0.027261, 1.349437, 0.0, 0.259777, 0.027725, 1.367221, 0.0, 
		0.262913, 0.028199, 1.385106, 0.0, 0.266054, 0.028681, 1.403050, 0.0, 0.269191, 0.029172, 1.421001, 0.0, 0.272311, 0.029671, 1.438904, 0.0, 
		0.275404, 0.030178, 1.456709, 0.0, 0.278458, 0.030693, 1.474355, 0.0, 0.281462, 0.031215, 1.491786, 0.0, 0.284401, 0.031745, 1.508936, 0.0, 
		0.287263, 0.032281, 1.525747, 0.0, 0.290034, 0.032825, 1.542147, 0.0, 0.292700, 0.033374, 1.558076, 0.0, 0.295256, 0.033930, 1.573500, 0.0, 
		0.297709, 0.034491, 1.588459, 0.0, 0.300068, 0.035059, 1.602996, 0.0, 0.302343, 0.035632, 1.617157, 0.0, 0.304544, 0.036211, 1.630992, 0.0, 
		0.306682, 0.036796, 1.644551, 0.0, 0.308768, 0.037386, 1.657890, 0.0, 0.310814, 0.037981, 1.671062, 0.0, 0.312833, 0.038582, 1.684126, 0.0, 
		0.314836, 0.039187, 1.697141, 0.0, 0.316838, 0.039798, 1.710169, 0.0, 0.318852, 0.040413, 1.723275, 0.0, 0.320891, 0.041033, 1.736520, 0.0, 
		0.322972, 0.041658, 1.749978, 0.0, 0.325100, 0.042286, 1.763672, 0.0, 0.327261, 0.042917, 1.777530, 0.0, 0.329436, 0.043551, 1.791447, 0.0, 
		0.331605, 0.044185, 1.805322, 0.0, 0.333747, 0.044819, 1.819050, 0.0, 0.335841, 0.045451, 1.832515, 0.0, 0.337868, 0.046080, 1.845614, 0.0, 
		0.339801, 0.046705, 1.858221, 0.0, 0.341622, 0.047325, 1.870230, 0.0, 0.343304, 0.047938, 1.881508, 0.0, 0.344827, 0.048543, 1.891946, 0.0, 
		0.346164, 0.049137, 1.901406, 0.0, 0.347293, 0.049720, 1.909780, 0.0, 0.348190, 0.050290, 1.916931, 0.0, 0.348836, 0.050845, 1.922772, 0.0, 
		0.349240, 0.051387, 1.927341, 0.0, 0.349420, 0.051915, 1.930736, 0.0, 0.349395, 0.052432, 1.933053, 0.0, 0.349183, 0.052939, 1.934388, 0.0, 
		0.348804, 0.053438, 1.934847, 0.0, 0.348278, 0.053928, 1.934526, 0.0, 0.347625, 0.054413, 1.933536, 0.0, 0.346864, 0.054894, 1.931972, 0.0, 
		0.346016, 0.055372, 1.929948, 0.0, 0.345099, 0.055849, 1.927557, 0.0, 0.344135, 0.056326, 1.924914, 0.0, 0.343142, 0.056807, 1.922114, 0.0, 
		0.342140, 0.057291, 1.919263, 0.0, 0.341146, 0.057783, 1.916453, 0.0, 0.340157, 0.058280, 1.913665, 0.0, 0.339158, 0.058784, 1.910817, 0.0, 
		0.338137, 0.059292, 1.907834, 0.0, 0.337076, 0.059805, 1.904629, 0.0, 0.335964, 0.060321, 1.901131, 0.0, 0.334784, 0.060840, 1.897252, 0.0, 
		0.333525, 0.061361, 1.892924, 0.0, 0.332171, 0.061882, 1.888060, 0.0, 0.330710, 0.062404, 1.882594, 0.0, 0.329128, 0.062924, 1.876443, 0.0, 
		0.327413, 0.063443, 1.869543, 0.0, 0.325552, 0.063958, 1.861817, 0.0, 0.323534, 0.064470, 1.853201, 0.0, 0.321348, 0.064976, 1.843632, 0.0, 
		0.318998, 0.065478, 1.833135, 0.0, 0.316504, 0.065977, 1.821822, 0.0, 0.313884, 0.066476, 1.809798, 0.0, 0.311158, 0.066976, 1.797181, 0.0, 
		0.308344, 0.067480, 1.784072, 0.0, 0.305460, 0.067989, 1.770583, 0.0, 0.302523, 0.068507, 1.756812, 0.0, 0.299552, 0.069036, 1.742864, 0.0, 
		0.296560, 0.069578, 1.728833, 0.0, 0.293565, 0.070135, 1.714816, 0.0, 0.290581, 0.070711, 1.700905, 0.0, 0.287622, 0.071307, 1.687184, 0.0, 
		0.284703, 0.071928, 1.673748, 0.0, 0.281834, 0.072575, 1.660668, 0.0, 0.279027, 0.073252, 1.648009, 0.0, 0.276280, 0.073958, 1.635763, 0.0, 
		0.273597, 0.074696, 1.623942, 0.0, 0.270975, 0.075466, 1.612536, 0.0, 0.268417, 0.076270, 1.601552, 0.0, 0.265922, 0.077108, 1.590983, 0.0, 
		0.263492, 0.077984, 1.580838, 0.0, 0.261127, 0.078896, 1.571108, 0.0, 0.258829, 0.079848, 1.561801, 0.0, 0.256598, 0.080840, 1.552911, 0.0, 
		0.254435, 0.081874, 1.544444, 0.0, 0.252341, 0.082953, 1.536398, 0.0, 0.250318, 0.084077, 1.528775, 0.0, 0.248366, 0.085248, 1.521577, 0.0, 
		0.246484, 0.086468, 1.514784, 0.0, 0.244659, 0.087735, 1.508331, 0.0, 0.242876, 0.089048, 1.502134, 0.0, 0.241123, 0.090405, 1.496118, 0.0, 
		0.239383, 0.091803, 1.490204, 0.0, 0.237645, 0.093240, 1.484316, 0.0, 0.235895, 0.094713, 1.478381, 0.0, 0.234120, 0.096221, 1.472325, 0.0, 
		0.232308, 0.097760, 1.466077, 0.0, 0.230444, 0.099328, 1.459562, 0.0, 0.228520, 0.100919, 1.452719, 0.0, 0.226521, 0.102533, 1.445466, 0.0, 
		0.224438, 0.104164, 1.437756, 0.0, 0.222257, 0.105808, 1.429505, 0.0, 0.219973, 0.107462, 1.420678, 0.0, 0.217581, 0.109124, 1.411249, 0.0, 
		0.215088, 0.110793, 1.401242, 0.0, 0.212494, 0.112469, 1.390654, 0.0, 0.209805, 0.114149, 1.379508, 0.0, 0.207020, 0.115834, 1.367804, 0.0, 
		0.204147, 0.117523, 1.355564, 0.0, 0.201186, 0.119213, 1.342793, 0.0, 0.198144, 0.120904, 1.329510, 0.0, 0.195022, 0.122596, 1.315727, 0.0, 
		0.191826, 0.124286, 1.301459, 0.0, 0.188560, 0.125974, 1.286723, 0.0, 0.185227, 0.127658, 1.271533, 0.0, 0.181834, 0.129337, 1.255910, 0.0, 
		0.178384, 0.131010, 1.239867, 0.0, 0.174884, 0.132678, 1.223440, 0.0, 0.171339, 0.134340, 1.206662, 0.0, 0.167758, 0.135997, 1.189576, 0.0, 
		0.164145, 0.137651, 1.172211, 0.0, 0.160508, 0.139303, 1.154611, 0.0, 0.156851, 0.140954, 1.136802, 0.0, 0.153181, 0.142605, 1.118826, 0.0, 
		0.149503, 0.144258, 1.100709, 0.0, 0.145822, 0.145913, 1.082487, 0.0, 0.142143, 0.147572, 1.064187, 0.0, 0.138470, 0.149237, 1.045839, 0.0, 
		0.134808, 0.150910, 1.027473, 0.0, 0.131160, 0.152591, 1.009113, 0.0, 0.127532, 0.154284, 0.990785, 0.0, 0.123926, 0.155988, 0.972516, 0.0, 
		0.120349, 0.157704, 0.954337, 0.0, 0.116805, 0.159431, 0.936272, 0.0, 0.113299, 0.161172, 0.918350, 0.0, 0.109835, 0.162924, 0.900594, 0.0, 
		0.106417, 0.164689, 0.883025, 0.0, 0.103049, 0.166466, 0.865666, 0.0, 0.099734, 0.168256, 0.848533, 0.0, 0.096474, 0.170059, 0.831647, 0.0, 
		0.093274, 0.171876, 0.815022, 0.0, 0.090134, 0.173705, 0.798673, 0.0, 0.087057, 0.175548, 0.782613, 0.0, 0.084045, 0.177404, 0.766856, 0.0, 
		0.081099, 0.179274, 0.751407, 0.0, 0.078220, 0.181157, 0.736275, 0.0, 0.075405, 0.183054, 0.721435, 0.0, 0.072652, 0.184963, 0.706878, 0.0, 
		0.069957, 0.186884, 0.692581, 0.0, 0.067321, 0.188816, 0.678536, 0.0, 0.064739, 0.190758, 0.664720, 0.0, 0.062211, 0.192709, 0.651130, 0.0, 
		0.059736, 0.194670, 0.637744, 0.0, 0.057312, 0.196638, 0.624558, 0.0, 0.054937, 0.198613, 0.611555, 0.0, 0.052611, 0.200594, 0.598730, 0.0, 
		0.050333, 0.202581, 0.586070, 0.0, 0.048103, 0.204572, 0.573571, 0.0, 0.045919, 0.206566, 0.561220, 0.0, 0.043782, 0.208564, 0.549020, 0.0, 
		0.041695, 0.210569, 0.536986, 0.0, 0.039659, 0.212588, 0.525141, 0.0, 0.037677, 0.214626, 0.513500, 0.0, 0.035750, 0.216689, 0.502084, 0.0, 
		0.033881, 0.218783, 0.490906, 0.0, 0.032069, 0.220914, 0.479979, 0.0, 0.030317, 0.223090, 0.469317, 0.0, 0.028624, 0.225316, 0.458928, 0.0, 
		0.026992, 0.227601, 0.448825, 0.0, 0.025420, 0.229951, 0.439011, 0.0, 0.023908, 0.232375, 0.429498, 0.0, 0.022457, 0.234880, 0.420286, 0.0, 
		0.021066, 0.237475, 0.411387, 0.0, 0.019735, 0.240167, 0.402795, 0.0, 0.018462, 0.242958, 0.394506, 0.0, 0.017246, 0.245846, 0.386492, 0.0, 
		0.016086, 0.248832, 0.378747, 0.0, 0.014978, 0.251911, 0.371246, 0.0, 0.013925, 0.255085, 0.363983, 0.0, 0.012923, 0.258349, 0.356936, 0.0, 
		0.011973, 0.261705, 0.350099, 0.0, 0.011073, 0.265147, 0.343453, 0.0, 0.010225, 0.268677, 0.336992, 0.0, 0.009426, 0.272289, 0.330699, 0.0, 
		0.008677, 0.275984, 0.324569, 0.0, 0.007978, 0.279757, 0.318589, 0.0, 0.007329, 0.283606, 0.312750, 0.0, 0.006729, 0.287529, 0.307043, 0.0, 
		0.006179, 0.291524, 0.301458, 0.0, 0.005675, 0.295593, 0.295984, 0.0, 0.005214, 0.299736, 0.290609, 0.0, 0.004796, 0.303954, 0.285325, 0.0, 
		0.004416, 0.308249, 0.280121, 0.0, 0.004073, 0.312620, 0.274990, 0.0, 0.003765, 0.317069, 0.269922, 0.0, 0.003491, 0.321596, 0.264912, 0.0, 
		0.003246, 0.326203, 0.259950, 0.0, 0.003031, 0.330890, 0.255032, 0.0, 0.002841, 0.335657, 0.250151, 0.0, 0.002677, 0.340507, 0.245301, 0.0, 
		0.002535, 0.345438, 0.240478, 0.0, 0.002414, 0.350454, 0.235678, 0.0, 0.002312, 0.355552, 0.230897, 0.0, 0.002233, 0.360734, 0.226138, 0.0, 
		0.002177, 0.365997, 0.221400, 0.0, 0.002148, 0.371342, 0.216685, 0.0, 0.002145, 0.376767, 0.211995, 0.0, 0.002173, 0.382273, 0.207330, 0.0, 
		0.002232, 0.387857, 0.202692, 0.0, 0.002325, 0.393519, 0.198082, 0.0, 0.002454, 0.399256, 0.193501, 0.0, 0.002622, 0.405069, 0.188951, 0.0, 
		0.002831, 0.410955, 0.184432, 0.0, 0.003083, 0.416912, 0.179948, 0.0, 0.003380, 0.422940, 0.175499, 0.0, 0.003726, 0.429035, 0.171086, 0.0, 
		0.004123, 0.435197, 0.166714, 0.0, 0.004575, 0.441424, 0.162395, 0.0, 0.005086, 0.447713, 0.158140, 0.0, 0.005661, 0.454064, 0.153958, 0.0, 
		0.006301, 0.460475, 0.149858, 0.0, 0.007012, 0.466943, 0.145849, 0.0, 0.007795, 0.473467, 0.141937, 0.0, 0.008655, 0.480044, 0.138127, 0.0, 
		0.009594, 0.486673, 0.134427, 0.0, 0.010614, 0.493350, 0.130838, 0.0, 0.011720, 0.500075, 0.127368, 0.0, 0.012912, 0.506842, 0.124015, 0.0, 
		0.014196, 0.513651, 0.120787, 0.0, 0.015570, 0.520497, 0.117680, 0.0, 0.017040, 0.527379, 0.114699, 0.0, 0.018598, 0.534294, 0.111830, 0.0, 
		0.020243, 0.541241, 0.109067, 0.0, 0.021969, 0.548217, 0.106397, 0.0, 0.023773, 0.555220, 0.103815, 0.0, 0.025649, 0.562249, 0.101309, 0.0, 
		0.027593, 0.569302, 0.098874, 0.0, 0.029599, 0.576376, 0.096502, 0.0, 0.031663, 0.583469, 0.094187, 0.0, 0.033780, 0.590578, 0.091923, 0.0, 
		0.035946, 0.597702, 0.089704, 0.0, 0.038153, 0.604838, 0.087526, 0.0, 0.040398, 0.611983, 0.085383, 0.0, 0.042674, 0.619135, 0.083272, 0.0, 
		0.044977, 0.626291, 0.081189, 0.0, 0.047307, 0.633443, 0.079135, 0.0, 0.049667, 0.640583, 0.077110, 0.0, 0.052060, 0.647702, 0.075118, 0.0, 
		0.054488, 0.654790, 0.073158, 0.0, 0.056955, 0.661838, 0.071233, 0.0, 0.059463, 0.668835, 0.069344, 0.0, 0.062016, 0.675771, 0.067490, 0.0, 
		0.064615, 0.682636, 0.065674, 0.0, 0.067264, 0.689417, 0.063896, 0.0, 0.069965, 0.696106, 0.062155, 0.0, 0.072723, 0.702687, 0.060454, 0.0, 
		0.075537, 0.709154, 0.058791, 0.0, 0.078413, 0.715488, 0.057169, 0.0, 0.081351, 0.721685, 0.055585, 0.0, 0.084353, 0.727737, 0.054041, 0.0, 
		0.087414, 0.733652, 0.052534, 0.0, 0.090535, 0.739435, 0.051065, 0.0, 0.093712, 0.745094, 0.049632, 0.0, 0.096944, 0.750633, 0.048234, 0.0, 
		0.100229, 0.756062, 0.046870, 0.0, 0.103564, 0.761387, 0.045540, 0.0, 0.106950, 0.766616, 0.044243, 0.0, 0.110383, 0.771757, 0.042977, 0.0, 
		0.113862, 0.776819, 0.041743, 0.0, 0.117387, 0.781811, 0.040539, 0.0, 0.120956, 0.786741, 0.039365, 0.0, 0.124568, 0.791618, 0.038220, 0.0, 
		0.128222, 0.796453, 0.037104, 0.0, 0.131917, 0.801250, 0.036015, 0.0, 0.135651, 0.806004, 0.034954, 0.0, 0.139421, 0.810712, 0.033921, 0.0, 
		0.143225, 0.815370, 0.032914, 0.0, 0.147059, 0.819974, 0.031934, 0.0, 0.150922, 0.824518, 0.030981, 0.0, 0.154809, 0.829000, 0.030054, 0.0, 
		0.158720, 0.833413, 0.029152, 0.0, 0.162648, 0.837756, 0.028276, 0.0, 0.166594, 0.842021, 0.027424, 0.0, 0.170551, 0.846206, 0.026597, 0.0, 
		0.174518, 0.850303, 0.025794, 0.0, 0.178490, 0.854312, 0.025014, 0.0, 0.182465, 0.858224, 0.024257, 0.0, 0.186440, 0.862042, 0.023523, 0.0, 
		0.190419, 0.865769, 0.022810, 0.0, 0.194406, 0.869418, 0.022118, 0.0, 0.198406, 0.872995, 0.021447, 0.0, 0.202424, 0.876511, 0.020794, 0.0, 
		0.206465, 0.879974, 0.020160, 0.0, 0.210534, 0.883395, 0.019544, 0.0, 0.214637, 0.886783, 0.018945, 0.0, 0.218780, 0.890148, 0.018363, 0.0, 
		0.222969, 0.893500, 0.017797, 0.0, 0.227210, 0.896851, 0.017246, 0.0, 0.231510, 0.900209, 0.016711, 0.0, 0.235877, 0.903586, 0.016190, 0.0, 
		0.240315, 0.906992, 0.015683, 0.0, 0.244833, 0.910436, 0.015189, 0.0, 0.249426, 0.913910, 0.014709, 0.0, 0.254093, 0.917403, 0.014243, 0.0, 
		0.258825, 0.920904, 0.013789, 0.0, 0.263619, 0.924402, 0.013349, 0.0, 0.268469, 0.927885, 0.012921, 0.0, 0.273370, 0.931341, 0.012505, 0.0, 
		0.278315, 0.934758, 0.012102, 0.0, 0.283299, 0.938124, 0.011711, 0.0, 0.288314, 0.941428, 0.011332, 0.0, 0.293353, 0.944654, 0.010964, 0.0, 
		0.298410, 0.947794, 0.010608, 0.0, 0.303477, 0.950831, 0.010263, 0.0, 0.308545, 0.953755, 0.009928, 0.0, 0.313608, 0.956553, 0.009605, 0.0, 
		0.318662, 0.959220, 0.009291, 0.0, 0.323706, 0.961756, 0.008988, 0.0, 0.328738, 0.964162, 0.008694, 0.0, 0.333758, 0.966435, 0.008410, 0.0, 
		0.338765, 0.968577, 0.008135, 0.0, 0.343757, 0.970586, 0.007868, 0.0, 0.348733, 0.972464, 0.007610, 0.0, 0.353693, 0.974209, 0.007361, 0.0, 
		0.358635, 0.975822, 0.007119, 0.0, 0.363558, 0.977304, 0.006885, 0.0, 0.368461, 0.978652, 0.006658, 0.0, 0.373343, 0.979870, 0.006439, 0.0, 
		0.378204, 0.980955, 0.006227, 0.0, 0.383042, 0.981911, 0.006021, 0.0, 0.387859, 0.982743, 0.005822, 0.0, 0.392661, 0.983468, 0.005629, 0.0, 
		0.397451, 0.984099, 0.005443, 0.0, 0.402235, 0.984653, 0.005262, 0.0, 0.407019, 0.985142, 0.005088, 0.0, 0.411809, 0.985585, 0.004919, 0.0, 
		0.416610, 0.985995, 0.004755, 0.0, 0.421429, 0.986388, 0.004597, 0.0, 0.426273, 0.986778, 0.004443, 0.0, 0.431149, 0.987182, 0.004295, 0.0, 
		0.436064, 0.987614, 0.004151, 0.0, 0.441026, 0.988090, 0.004012, 0.0, 0.446042, 0.988626, 0.003878, 0.0, 0.451122, 0.989236, 0.003747, 0.0, 
		0.456269, 0.989924, 0.003621, 0.0, 0.461485, 0.990678, 0.003499, 0.0, 0.466768, 0.991483, 0.003381, 0.0, 0.472117, 0.992324, 0.003267, 0.0, 
		0.477530, 0.993187, 0.003157, 0.0, 0.483007, 0.994057, 0.003050, 0.0, 0.488544, 0.994919, 0.002947, 0.0, 0.494140, 0.995760, 0.002848, 0.0, 
		0.499791, 0.996563, 0.002752, 0.0, 0.505495, 0.997314, 0.002659, 0.0, 0.511247, 0.997999, 0.002569, 0.0, 0.517045, 0.998601, 0.002482, 0.0, 
		0.522884, 0.999108, 0.002398, 0.0, 0.528760, 0.999502, 0.002317, 0.0, 0.534667, 0.999778, 0.002239, 0.0, 0.540602, 0.999940, 0.002164, 0.0, 
		0.546560, 1.000000, 0.002091, 0.0, 0.552539, 0.999966, 0.002021, 0.0, 0.558536, 0.999852, 0.001953, 0.0, 0.564546, 0.999664, 0.001887, 0.0, 
		0.570568, 0.999416, 0.001824, 0.0, 0.576599, 0.999116, 0.001763, 0.0, 0.582637, 0.998775, 0.001703, 0.0, 0.588680, 0.998402, 0.001646, 0.0, 
		0.594727, 0.998009, 0.001591, 0.0, 0.600775, 0.997605, 0.001538, 0.0, 0.606825, 0.997201, 0.001486, 0.0, 0.612874, 0.996806, 0.001436, 0.0, 
		0.618925, 0.996428, 0.001388, 0.0, 0.624980, 0.996065, 0.001341, 0.0, 0.631045, 0.995709, 0.001296, 0.0, 0.637126, 0.995355, 0.001253, 0.0, 
		0.643228, 0.994995, 0.001211, 0.0, 0.649355, 0.994623, 0.001170, 0.0, 0.655511, 0.994234, 0.001131, 0.0, 0.661702, 0.993820, 0.001093, 0.0, 
		0.667932, 0.993375, 0.001057, 0.0, 0.674203, 0.992893, 0.001021, 0.0, 0.680520, 0.992367, 0.000987, 0.0, 0.686886, 0.991793, 0.000954, 0.0, 
		0.693305, 0.991161, 0.000922, 0.0, 0.699778, 0.990469, 0.000891, 0.0, 0.706310, 0.989709, 0.000861, 0.0, 0.712894, 0.988880, 0.000832, 0.0, 
		0.719524, 0.987983, 0.000805, 0.0, 0.726193, 0.987022, 0.000778, 0.0, 0.732893, 0.985994, 0.000752, 0.0, 0.739618, 0.984904, 0.000727, 0.0, 
		0.746360, 0.983751, 0.000703, 0.0, 0.753112, 0.982538, 0.000679, 0.0, 0.759867, 0.981265, 0.000657, 0.0, 0.766618, 0.979935, 0.000635, 0.0, 
		0.773359, 0.978547, 0.000614, 0.0, 0.780083, 0.977104, 0.000593, 0.0, 0.786783, 0.975606, 0.000574, 0.0, 0.793453, 0.974056, 0.000555, 0.0, 
		0.800086, 0.972453, 0.000536, 0.0, 0.806678, 0.970796, 0.000518, 0.0, 0.813226, 0.969078, 0.000501, 0.0, 0.819727, 0.967293, 0.000485, 0.0, 
		0.826177, 0.965436, 0.000469, 0.0, 0.832572, 0.963500, 0.000453, 0.0, 0.838910, 0.961480, 0.000438, 0.0, 0.845185, 0.959369, 0.000424, 0.0, 
		0.851395, 0.957162, 0.000410, 0.0, 0.857533, 0.954853, 0.000396, 0.0, 0.863596, 0.952438, 0.000383, 0.0, 0.869578, 0.949909, 0.000371, 0.0, 
		0.875476, 0.947264, 0.000359, 0.0, 0.881282, 0.944494, 0.000347, 0.0, 0.886993, 0.941598, 0.000335, 0.0, 0.892608, 0.938576, 0.000324, 0.0, 
		0.898143, 0.935449, 0.000314, 0.0, 0.903613, 0.932232, 0.000304, 0.0, 0.909034, 0.928946, 0.000294, 0.0, 0.914422, 0.925607, 0.000284, 0.0, 
		0.919795, 0.922235, 0.000275, 0.0, 0.925169, 0.918846, 0.000266, 0.0, 0.930562, 0.915459, 0.000257, 0.0, 0.935991, 0.912091, 0.000249, 0.0, 
		0.941475, 0.908758, 0.000241, 0.0, 0.947033, 0.905477, 0.000233, 0.0, 0.952683, 0.902266, 0.000226, 0.0, 0.958444, 0.899139, 0.000218, 0.0, 
		0.964337, 0.896114, 0.000211, 0.0, 0.970370, 0.893200, 0.000204, 0.0, 0.976527, 0.890385, 0.000198, 0.0, 0.982778, 0.887654, 0.000191, 0.0, 
		0.989100, 0.884994, 0.000185, 0.0, 0.995466, 0.882389, 0.000179, 0.0, 1.001849, 0.879825, 0.000174, 0.0, 1.008223, 0.877286, 0.000168, 0.0, 
		1.014561, 0.874760, 0.000163, 0.0, 1.020838, 0.872232, 0.000158, 0.0, 1.027023, 0.869687, 0.000153, 0.0, 1.033095, 0.867112, 0.000148, 0.0, 
		1.039019, 0.864493, 0.000143, 0.0, 1.044776, 0.861817, 0.000138, 0.0, 1.050330, 0.859069, 0.000134, 0.0, 1.055665, 0.856239, 0.000130, 0.0, 
		1.060776, 0.853323, 0.000126, 0.0, 1.065681, 0.850328, 0.000122, 0.0, 1.070385, 0.847253, 0.000118, 0.0, 1.074901, 0.844104, 0.000114, 0.0, 
		1.079237, 0.840881, 0.000111, 0.0, 1.083406, 0.837588, 0.000107, 0.0, 1.087416, 0.834229, 0.000104, 0.0, 1.091278, 0.830805, 0.000101, 0.0, 
		1.095001, 0.827320, 0.000097, 0.0, 1.098596, 0.823777, 0.000094, 0.0, 1.102071, 0.820179, 0.000091, 0.0, 1.105435, 0.816529, 0.000089, 0.0, 
		1.108699, 0.812830, 0.000086, 0.0, 1.111870, 0.809084, 0.000083, 0.0, 1.114947, 0.805295, 0.000081, 0.0, 1.117926, 0.801462, 0.000078, 0.0, 
		1.120802, 0.797588, 0.000076, 0.0, 1.123569, 0.793672, 0.000073, 0.0, 1.126223, 0.789718, 0.000071, 0.0, 1.128756, 0.785724, 0.000069, 0.0, 
		1.131169, 0.781694, 0.000067, 0.0, 1.133452, 0.777627, 0.000065, 0.0, 1.135606, 0.773525, 0.000063, 0.0, 1.137621, 0.769388, 0.000061, 0.0, 
		1.139500, 0.765219, 0.000059, 0.0, 1.141233, 0.761017, 0.000057, 0.0, 1.142822, 0.756784, 0.000056, 0.0, 1.144259, 0.752520, 0.000054, 0.0, 
		1.145548, 0.748228, 0.000052, 0.0, 1.146693, 0.743909, 0.000051, 0.0, 1.147699, 0.739566, 0.000049, 0.0, 1.148570, 0.735199, 0.000048, 0.0, 
		1.149313, 0.730812, 0.000046, 0.0, 1.149931, 0.726407, 0.000045, 0.0, 1.150430, 0.721985, 0.000043, 0.0, 1.150815, 0.717549, 0.000042, 0.0, 
		1.151089, 0.713100, 0.000041, 0.0, 1.151259, 0.708640, 0.000040, 0.0, 1.151327, 0.704172, 0.000039, 0.0, 1.151300, 0.699697, 0.000037, 0.0, 
		1.151180, 0.695217, 0.000036, 0.0, 1.150972, 0.690734, 0.000035, 0.0, 1.150676, 0.686249, 0.000034, 0.0, 1.150284, 0.681760, 0.000033, 0.0, 
		1.149784, 0.677264, 0.000032, 0.0, 1.149167, 0.672760, 0.000031, 0.0, 1.148423, 0.668245, 0.000030, 0.0, 1.147547, 0.663717, 0.000029, 0.0, 
		1.146522, 0.659175, 0.000029, 0.0, 1.145349, 0.654616, 0.000028, 0.0, 1.144012, 0.650039, 0.000027, 0.0, 1.142510, 0.645441, 0.000026, 0.0, 
		1.140828, 0.640821, 0.000025, 0.0, 1.138965, 0.636177, 0.000025, 0.0, 1.136909, 0.631507, 0.000024, 0.0, 1.134658, 0.626810, 0.000023, 0.0, 
		1.132204, 0.622085, 0.000023, 0.0, 1.129555, 0.617333, 0.000022, 0.0, 1.126713, 0.612558, 0.000021, 0.0, 1.123689, 0.607762, 0.000021, 0.0, 
		1.120486, 0.602947, 0.000020, 0.0, 1.117112, 0.598117, 0.000020, 0.0, 1.113572, 0.593273, 0.000019, 0.0, 1.109874, 0.588418, 0.000019, 0.0, 
		1.106024, 0.583554, 0.000018, 0.0, 1.102026, 0.578685, 0.000017, 0.0, 1.097888, 0.573811, 0.000017, 0.0, 1.093616, 0.568935, 0.000017, 0.0, 
		1.089215, 0.564059, 0.000016, 0.0, 1.084692, 0.559186, 0.000016, 0.0, 1.080053, 0.554318, 0.000015, 0.0, 1.075296, 0.549454, 0.000015, 0.0, 
		1.070428, 0.544594, 0.000014, 0.0, 1.065445, 0.539739, 0.000014, 0.0, 1.060351, 0.534888, 0.000014, 0.0, 1.055145, 0.530041, 0.000013, 0.0, 
		1.049830, 0.525197, 0.000013, 0.0, 1.044405, 0.520358, 0.000012, 0.0, 1.038874, 0.515522, 0.000012, 0.0, 1.033235, 0.510691, 0.000012, 0.0, 
		1.027491, 0.505862, 0.000011, 0.0, 1.021642, 0.501038, 0.000011, 0.0, 1.015692, 0.496217, 0.000011, 0.0, 1.009639, 0.491400, 0.000011, 0.0, 
		1.003484, 0.486587, 0.000000, 0.0, 0.997238, 0.481780, 0.000000, 0.0, 0.990908, 0.476982, 0.000000, 0.0, 0.984503, 0.472197, 0.000000, 0.0, 
		0.978032, 0.467426, 0.000000, 0.0, 0.971503, 0.462673, 0.000000, 0.0, 0.964926, 0.457940, 0.000000, 0.0, 0.958309, 0.453231, 0.000000, 0.0, 
		0.951659, 0.448549, 0.000000, 0.0, 0.944985, 0.443894, 0.000000, 0.0, 0.938294, 0.439270, 0.000000, 0.0, 0.931593, 0.434680, 0.000000, 0.0, 
		0.924890, 0.430125, 0.000000, 0.0, 0.918191, 0.425607, 0.000000, 0.0, 0.911503, 0.421129, 0.000000, 0.0, 0.904821, 0.416688, 0.000000, 0.0, 
		0.898130, 0.412281, 0.000000, 0.0, 0.891414, 0.407899, 0.000000, 0.0, 0.884656, 0.403538, 0.000000, 0.0, 0.877844, 0.399192, 0.000000, 0.0, 
		0.870960, 0.394858, 0.000000, 0.0, 0.863994, 0.390528, 0.000000, 0.0, 0.856931, 0.386199, 0.000000, 0.0, 0.849761, 0.381866, 0.000000, 0.0, 
		0.842469, 0.377526, 0.000000, 0.0, 0.835048, 0.373173, 0.000000, 0.0, 0.827486, 0.368804, 0.000000, 0.0, 0.819773, 0.364415, 0.000000, 0.0, 
		0.811902, 0.360003, 0.000000, 0.0, 0.803871, 0.355568, 0.000000, 0.0, 0.795698, 0.351114, 0.000000, 0.0, 0.787399, 0.346647, 0.000000, 0.0, 
		0.778994, 0.342172, 0.000000, 0.0, 0.770498, 0.337696, 0.000000, 0.0, 0.761929, 0.333222, 0.000000, 0.0, 0.753301, 0.328757, 0.000000, 0.0, 
		0.744630, 0.324303, 0.000000, 0.0, 0.735930, 0.319867, 0.000000, 0.0, 0.727216, 0.315452, 0.000000, 0.0, 0.718501, 0.311063, 0.000000, 0.0, 
		0.709797, 0.306703, 0.000000, 0.0, 0.701117, 0.302377, 0.000000, 0.0, 0.692472, 0.298086, 0.000000, 0.0, 0.683872, 0.293837, 0.000000, 0.0, 
		0.675319, 0.289627, 0.000000, 0.0, 0.666818, 0.285459, 0.000000, 0.0, 0.658368, 0.281333, 0.000000, 0.0, 0.649974, 0.277249, 0.000000, 0.0, 
		0.641636, 0.273207, 0.000000, 0.0, 0.633356, 0.269209, 0.000000, 0.0, 0.625136, 0.265254, 0.000000, 0.0, 0.616978, 0.261343, 0.000000, 0.0, 
		0.608883, 0.257476, 0.000000, 0.0, 0.600853, 0.253654, 0.000000, 0.0, 0.592889, 0.249875, 0.000000, 0.0, 0.584992, 0.246142, 0.000000, 0.0, 
		0.577164, 0.242453, 0.000000, 0.0, 0.569406, 0.238810, 0.000000, 0.0, 0.561720, 0.235211, 0.000000, 0.0, 0.554109, 0.231658, 0.000000, 0.0, 
		0.546575, 0.228150, 0.000000, 0.0, 0.539120, 0.224687, 0.000000, 0.0, 0.531747, 0.221270, 0.000000, 0.0, 0.524457, 0.217898, 0.000000, 0.0, 
		0.517252, 0.214573, 0.000000, 0.0, 0.510132, 0.211292, 0.000000, 0.0, 0.503102, 0.208057, 0.000000, 0.0, 0.496158, 0.204868, 0.000000, 0.0, 
		0.489307, 0.201724, 0.000000, 0.0, 0.482544, 0.198625, 0.000000, 0.0, 0.475875, 0.195572, 0.000000, 0.0, 0.469297, 0.192563, 0.000000, 0.0, 
		0.462805, 0.189598, 0.000000, 0.0, 0.456388, 0.186672, 0.000000, 0.0, 0.450038, 0.183784, 0.000000, 0.0, 0.443742, 0.180930, 0.000000, 0.0, 
		0.437495, 0.178108, 0.000000, 0.0, 0.431286, 0.175315, 0.000000, 0.0, 0.425108, 0.172548, 0.000000, 0.0, 0.418954, 0.169806, 0.000000, 0.0, 
		0.412817, 0.167086, 0.000000, 0.0, 0.406692, 0.164386, 0.000000, 0.0, 0.400572, 0.161705, 0.000000, 0.0, 0.394453, 0.159040, 0.000000, 0.0, 
		0.388330, 0.156389, 0.000000, 0.0, 0.382198, 0.153752, 0.000000, 0.0, 0.376059, 0.151129, 0.000000, 0.0, 0.369921, 0.148520, 0.000000, 0.0, 
		0.363792, 0.145928, 0.000000, 0.0, 0.357679, 0.143354, 0.000000, 0.0, 0.351589, 0.140800, 0.000000, 0.0, 0.345529, 0.138268, 0.000000, 0.0, 
		0.339505, 0.135758, 0.000000, 0.0, 0.333524, 0.133272, 0.000000, 0.0, 0.327590, 0.130812, 0.000000, 0.0, 0.321710, 0.128378, 0.000000, 0.0, 
		0.315886, 0.125971, 0.000000, 0.0, 0.310125, 0.123594, 0.000000, 0.0, 0.304430, 0.121246, 0.000000, 0.0, 0.298806, 0.118928, 0.000000, 0.0, 
		0.293253, 0.116641, 0.000000, 0.0, 0.287775, 0.114386, 0.000000, 0.0, 0.282371, 0.112163, 0.000000, 0.0, 0.277043, 0.109972, 0.000000, 0.0, 
		0.271790, 0.107814, 0.000000, 0.0, 0.266613, 0.105688, 0.000000, 0.0, 0.261513, 0.103595, 0.000000, 0.0, 0.256490, 0.101535, 0.000000, 0.0, 
		0.251543, 0.099509, 0.000000, 0.0, 0.246674, 0.097515, 0.000000, 0.0, 0.241882, 0.095555, 0.000000, 0.0, 0.237167, 0.093628, 0.000000, 0.0, 
		0.232529, 0.091734, 0.000000, 0.0, 0.227968, 0.089873, 0.000000, 0.0, 0.223484, 0.088045, 0.000000, 0.0, 0.219075, 0.086250, 0.000000, 0.0, 
		0.214742, 0.084487, 0.000000, 0.0, 0.210481, 0.082755, 0.000000, 0.0, 0.206294, 0.081054, 0.000000, 0.0, 0.202176, 0.079384, 0.000000, 0.0, 
		0.198130, 0.077744, 0.000000, 0.0, 0.194151, 0.076133, 0.000000, 0.0, 0.190242, 0.074552, 0.000000, 0.0, 0.186399, 0.072999, 0.000000, 0.0, 
		0.182623, 0.071475, 0.000000, 0.0, 0.178911, 0.069979, 0.000000, 0.0, 0.175263, 0.068509, 0.000000, 0.0, 0.171678, 0.067067, 0.000000, 0.0, 
		0.168156, 0.065651, 0.000000, 0.0, 0.164694, 0.064261, 0.000000, 0.0, 0.161293, 0.062898, 0.000000, 0.0, 0.157952, 0.061559, 0.000000, 0.0, 
		0.154670, 0.060246, 0.000000, 0.0, 0.151445, 0.058957, 0.000000, 0.0, 0.148278, 0.057692, 0.000000, 0.0, 0.145167, 0.056452, 0.000000, 0.0, 
		0.142111, 0.055235, 0.000000, 0.0, 0.139111, 0.054042, 0.000000, 0.0, 0.136164, 0.052872, 0.000000, 0.0, 0.133271, 0.051724, 0.000000, 0.0, 
		0.130431, 0.050599, 0.000000, 0.0, 0.127642, 0.049496, 0.000000, 0.0, 0.124904, 0.048414, 0.000000, 0.0, 0.122218, 0.047353, 0.000000, 0.0, 
		0.119580, 0.046314, 0.000000, 0.0, 0.116992, 0.045295, 0.000000, 0.0, 0.114451, 0.044295, 0.000000, 0.0, 0.111959, 0.043316, 0.000000, 0.0, 
		0.109512, 0.042356, 0.000000, 0.0, 0.107113, 0.041415, 0.000000, 0.0, 0.104759, 0.040492, 0.000000, 0.0, 0.102450, 0.039588, 0.000000, 0.0, 
		0.100184, 0.038702, 0.000000, 0.0, 0.097963, 0.037833, 0.000000, 0.0, 0.095784, 0.036982, 0.000000, 0.0, 0.093648, 0.036147, 0.000000, 0.0, 
		0.091552, 0.035329, 0.000000, 0.0, 0.089498, 0.034528, 0.000000, 0.0, 0.087484, 0.033742, 0.000000, 0.0, 0.085509, 0.032972, 0.000000, 0.0, 
		0.083573, 0.032218, 0.000000, 0.0, 0.081676, 0.031479, 0.000000, 0.0, 0.079815, 0.030754, 0.000000, 0.0, 0.077991, 0.030045, 0.000000, 0.0, 
		0.076204, 0.029350, 0.000000, 0.0, 0.074452, 0.028668, 0.000000, 0.0, 0.072735, 0.028001, 0.000000, 0.0, 0.071052, 0.027348, 0.000000, 0.0, 
		0.069403, 0.026707, 0.000000, 0.0, 0.067787, 0.026080, 0.000000, 0.0, 0.066204, 0.025466, 0.000000, 0.0, 0.064652, 0.024865, 0.000000, 0.0, 
		0.063133, 0.024276, 0.000000, 0.0, 0.061644, 0.023699, 0.000000, 0.0, 0.060186, 0.023135, 0.000000, 0.0, 0.058758, 0.022582, 0.000000, 0.0, 
		0.057361, 0.022041, 0.000000, 0.0, 0.055992, 0.021512, 0.000000, 0.0, 0.054653, 0.020994, 0.000000, 0.0, 0.053342, 0.020488, 0.000000, 0.0, 
		0.052060, 0.019992, 0.000000, 0.0, 0.050805, 0.019507, 0.000000, 0.0, 0.049578, 0.019033, 0.000000, 0.0, 0.048377, 0.018570, 0.000000, 0.0, 
		0.047203, 0.018117, 0.000000, 0.0, 0.046055, 0.017674, 0.000000, 0.0, 0.044931, 0.017240, 0.000000, 0.0, 0.043833, 0.016817, 0.000000, 0.0, 
		0.042758, 0.016402, 0.000000, 0.0, 0.041706, 0.015997, 0.000000, 0.0, 0.040676, 0.015600, 0.000000, 0.0, 0.039668, 0.015212, 0.000000, 0.0, 
		0.038681, 0.014832, 0.000000, 0.0, 0.037715, 0.014460, 0.000000, 0.0, 0.036768, 0.014095, 0.000000, 0.0, 0.035841, 0.013739, 0.000000, 0.0, 
		0.034933, 0.013389, 0.000000, 0.0, 0.034044, 0.013047, 0.000000, 0.0, 0.033172, 0.012712, 0.000000, 0.0, 0.032319, 0.012384, 0.000000, 0.0, 
		0.031482, 0.012063, 0.000000, 0.0, 0.030665, 0.011748, 0.000000, 0.0, 0.029865, 0.011441, 0.000000, 0.0, 0.029085, 0.011141, 0.000000, 0.0, 
		0.028323, 0.010849, 0.000000, 0.0, 0.027580, 0.010564, 0.000000, 0.0, 0.026857, 0.010286, 0.000000, 0.0, 0.026153, 0.010016, 0.000000, 0.0, 
		0.025468, 0.009753, 0.000000, 0.0, 0.024803, 0.009498, 0.000000, 0.0, 0.024156, 0.009250, 0.000000, 0.0, 0.023529, 0.009009, 0.000000, 0.0, 
		0.022920, 0.008775, 0.000000, 0.0, 0.022331, 0.008549, 0.000000, 0.0, 0.021759, 0.008330, 0.000000, 0.0, 0.021205, 0.008117, 0.000000, 0.0, 
		0.020667, 0.007911, 0.000000, 0.0, 0.020145, 0.007711, 0.000000, 0.0, 0.019638, 0.007516, 0.000000, 0.0, 0.019145, 0.007327, 0.000000, 0.0, 
		0.018666, 0.007143, 0.000000, 0.0, 0.018199, 0.006964, 0.000000, 0.0, 0.017745, 0.006790, 0.000000, 0.0, 0.017302, 0.006621, 0.000000, 0.0, 
		0.016870, 0.006455, 0.000000, 0.0, 0.016450, 0.006294, 0.000000, 0.0, 0.016039, 0.006137, 0.000000, 0.0, 0.015638, 0.005983, 0.000000, 0.0, 
		0.015247, 0.005833, 0.000000, 0.0, 0.014865, 0.005687, 0.000000, 0.0, 0.014492, 0.005544, 0.000000, 0.0, 0.014128, 0.005405, 0.000000, 0.0, 
		0.013773, 0.005269, 0.000000, 0.0, 0.013426, 0.005136, 0.000000, 0.0, 0.013088, 0.005007, 0.000000, 0.0, 0.012758, 0.004881, 0.000000, 0.0, 
		0.012436, 0.004758, 0.000000, 0.0, 0.012122, 0.004638, 0.000000, 0.0, 0.011817, 0.004521, 0.000000, 0.0, 0.011518, 0.004407, 0.000000, 0.0, 
		0.011228, 0.004295, 0.000000, 0.0, 0.010945, 0.004187, 0.000000, 0.0, 0.010668, 0.004081, 0.000000, 0.0, 0.010399, 0.003978, 0.000000, 0.0, 
		0.010137, 0.003878, 0.000000, 0.0, 0.009881, 0.003780, 0.000000, 0.0, 0.009631, 0.003685, 0.000000, 0.0, 0.009388, 0.003591, 0.000000, 0.0, 
		0.009150, 0.003500, 0.000000, 0.0, 0.008918, 0.003412, 0.000000, 0.0, 0.008691, 0.003325, 0.000000, 0.0, 0.008470, 0.003240, 0.000000, 0.0, 
		0.008253, 0.003157, 0.000000, 0.0, 0.008042, 0.003077, 0.000000, 0.0, 0.007835, 0.002998, 0.000000, 0.0, 0.007634, 0.002920, 0.000000, 0.0, 
		0.007436, 0.002845, 0.000000, 0.0, 0.007244, 0.002771, 0.000000, 0.0, 0.007055, 0.002699, 0.000000, 0.0, 0.006871, 0.002629, 0.000000, 0.0, 
		0.006692, 0.002560, 0.000000, 0.0, 0.006516, 0.002493, 0.000000, 0.0, 0.006345, 0.002428, 0.000000, 0.0, 0.006178, 0.002364, 0.000000, 0.0, 
		0.006015, 0.002302, 0.000000, 0.0, 0.005857, 0.002241, 0.000000, 0.0, 0.005702, 0.002182, 0.000000, 0.0, 0.005551, 0.002124, 0.000000, 0.0, 
		0.005405, 0.002068, 0.000000, 0.0, 0.005261, 0.002013, 0.000000, 0.0, 0.005122, 0.001960, 0.000000, 0.0, 0.004987, 0.001908, 0.000000, 0.0, 
		0.004855, 0.001858, 0.000000, 0.0, 0.004726, 0.001809, 0.000000, 0.0, 0.004601, 0.001761, 0.000000, 0.0, 0.004480, 0.001715, 0.000000, 0.0, 
		0.004361, 0.001670, 0.000000, 0.0, 0.004246, 0.001626, 0.000000, 0.0, 0.004135, 0.001583, 0.000000, 0.0, 0.004026, 0.001541, 0.000000, 0.0, 
		0.003920, 0.001501, 0.000000, 0.0, 0.003817, 0.001462, 0.000000, 0.0, 0.003718, 0.001424, 0.000000, 0.0, 0.003621, 0.001387, 0.000000, 0.0, 
		0.003527, 0.001351, 0.000000, 0.0, 0.003435, 0.001316, 0.000000, 0.0, 0.003346, 0.001282, 0.000000, 0.0, 0.003260, 0.001249, 0.000000, 0.0, 
		0.003176, 0.001217, 0.000000, 0.0, 0.003094, 0.001185, 0.000000, 0.0, 0.003015, 0.001155, 0.000000, 0.0, 0.002937, 0.001125, 0.000000, 0.0, 
		0.002862, 0.001097, 0.000000, 0.0, 0.002788, 0.001068, 0.000000, 0.0, 0.002717, 0.001041, 0.000000, 0.0, 0.002647, 0.001015, 0.000000, 0.0, 
		0.002580, 0.000989, 0.000000, 0.0, 0.002513, 0.000963, 0.000000, 0.0, 0.002449, 0.000939, 0.000000, 0.0, 0.002386, 0.000915, 0.000000, 0.0, 
		0.002325, 0.000891, 0.000000, 0.0, 0.002265, 0.000868, 0.000000, 0.0, 0.002207, 0.000846, 0.000000, 0.0, 0.002150, 0.000824, 0.000000, 0.0, 
		0.002095, 0.000803, 0.000000, 0.0, 0.002041, 0.000783, 0.000000, 0.0, 0.001988, 0.000762, 0.000000, 0.0, 0.001937, 0.000743, 0.000000, 0.0, 
		0.001888, 0.000724, 0.000000, 0.0, 0.001839, 0.000706, 0.000000, 0.0, 0.001792, 0.000688, 0.000000, 0.0, 0.001747, 0.000670, 0.000000, 0.0, 
		0.001702, 0.000653, 0.000000, 0.0, 0.001659, 0.000636, 0.000000, 0.0, 0.001617, 0.000620, 0.000000, 0.0, 0.001576, 0.000605, 0.000000, 0.0, 
		0.001536, 0.000589, 0.000000, 0.0, 0.001497, 0.000575, 0.000000, 0.0, 0.001460, 0.000560, 0.000000, 0.0, 0.001423, 0.000546, 0.000000, 0.0, 
		0.001387, 0.000532, 0.000000, 0.0, 0.001352, 0.000519, 0.000000, 0.0, 0.001318, 0.000506, 0.000000, 0.0, 0.001285, 0.000494, 0.000000, 0.0, 
		0.001253, 0.000481, 0.000000, 0.0, 0.001222, 0.000469, 0.000000, 0.0, 0.001191, 0.000458, 0.000000, 0.0, 0.001161, 0.000446, 0.000000, 0.0, 
		0.001132, 0.000435, 0.000000, 0.0, 0.001104, 0.000424, 0.000000, 0.0, 0.001076, 0.000414, 0.000000, 0.0, 0.001050, 0.000403, 0.000000, 0.0, 
		0.001023, 0.000393, 0.000000, 0.0, 0.000998, 0.000383, 0.000000, 0.0, 0.000973, 0.000374, 0.000000, 0.0, 0.000948, 0.000364, 0.000000, 0.0, 
		0.000925, 0.000355, 0.000000, 0.0, 0.000901, 0.000346, 0.000000, 0.0, 0.000879, 0.000338, 0.000000, 0.0, 0.000857, 0.000329, 0.000000, 0.0, 
		0.000835, 0.000321, 0.000000, 0.0, 0.000814, 0.000313, 0.000000, 0.0, 0.000793, 0.000305, 0.000000, 0.0, 0.000773, 0.000297, 0.000000, 0.0, 
		0.000754, 0.000290, 0.000000, 0.0, 0.000735, 0.000283, 0.000000, 0.0, 0.000716, 0.000275, 0.000000, 0.0, 0.000698, 0.000269, 0.000000, 0.0, 
		0.000680, 0.000262, 0.000000, 0.0, 0.000663, 0.000255, 0.000000, 0.0, 0.000646, 0.000249, 0.000000, 0.0, 0.000630, 0.000243, 0.000000, 0.0, 
		0.000615, 0.000237, 0.000000, 0.0, 0.000599, 0.000231, 0.000000, 0.0, 0.000584, 0.000225, 0.000000, 0.0, 0.000570, 0.000219, 0.000000, 0.0, 
		0.000556, 0.000214, 0.000000, 0.0, 0.000542, 0.000209, 0.000000, 0.0, 0.000529, 0.000204, 0.000000, 0.0, 0.000516, 0.000199, 0.000000, 0.0, 
		0.000503, 0.000194, 0.000000, 0.0, 0.000491, 0.000189, 0.000000, 0.0, 0.000479, 0.000185, 0.000000, 0.0, 0.000468, 0.000180, 0.000000, 0.0, 
		0.000456, 0.000176, 0.000000, 0.0, 0.000445, 0.000172, 0.000000, 0.0, 0.000435, 0.000168, 0.000000, 0.0, 0.000424, 0.000164, 0.000000, 0.0, 
		0.000414, 0.000160, 0.000000, 0.0, 0.000404, 0.000156, 0.000000, 0.0, 0.000394, 0.000152, 0.000000, 0.0, 0.000384, 0.000148, 0.000000, 0.0, 
		0.000375, 0.000145, 0.000000, 0.0, 0.000366, 0.000141, 0.000000, 0.0, 0.000357, 0.000138, 0.000000, 0.0, 0.000348, 0.000134, 0.000000, 0.0, 
		0.000340, 0.000131, 0.000000, 0.0, 0.000331, 0.000128, 0.000000, 0.0, 0.000323, 0.000125, 0.000000, 0.0, 0.000315, 0.000122, 0.000000, 0.0, 
		0.000308, 0.000119, 0.000000, 0.0, 0.000300, 0.000116, 0.000000, 0.0, 0.000293, 0.000113, 0.000000, 0.0, 0.000286, 0.000110, 0.000000, 0.0
		
        ]);
}

